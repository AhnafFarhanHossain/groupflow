import { useState, useRef } from "react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";

export default function CreateTeamForm({ onClose }) {
  const [formData, setFormData] = useState({
    teamName: "",
    description: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePicture: "Only JPG, PNG or GIF files are allowed",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      // 2MB
      setErrors((prev) => ({
        ...prev,
        profilePicture: "File size must be less than 2MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, profilePicture: file }));
    setErrors((prev) => ({ ...prev, profilePicture: "" }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.teamName.trim()) {
      newErrors.teamName = "Team name is required";
    } else if (formData.teamName.length > 50) {
      newErrors.teamName = "Team name must be less than 50 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.teamName);
      if (formData.description) {
        formPayload.append("description", formData.description);
      }
      if (formData.profilePicture) {
        formPayload.append("profilePicture", formData.profilePicture);
      }

      const res = await fetch("/api/createTeam", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();
      if (data.error) {
        setErrors((prev) => ({ ...prev, submit: data.error }));
        return;
      }

      if (onClose) onClose();
      router.refresh();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create team. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative max-w-2xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg z-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Create New Team
        </h2>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="teamName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Team Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              maxLength={50}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.teamName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              aria-invalid={!!errors.teamName}
              aria-describedby={errors.teamName ? "teamName-error" : undefined}
              disabled={isSubmitting}
            />
            {errors.teamName && (
              <p id="teamName-error" className="mt-1 text-sm text-red-600">
                {errors.teamName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Tell us about your team (supports markdown)"
              disabled={isSubmitting}
            />
            <div className="mt-2 p-3 border border-gray-200 rounded-md bg-gray-50">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Preview:
              </h3>
              <div className="prose prose-sm max-w-none">
                {formData.description ? (
                  <ReactMarkdown>{formData.description}</ReactMarkdown>
                ) : (
                  <p className="text-gray-400">
                    Description preview will appear here
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/gif"
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Choose File
                </Button>
                {errors.profilePicture && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.profilePicture}
                  </p>
                )}
              </div>
              {preview && (
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Team"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
