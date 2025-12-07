import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useApi } from "../../hooks/useApi";

interface CreateCampaignPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // refresh parent list
}

const recipientTypes = [
  "all users",
  "premium users",
  "specific users",
];

const campaignTypes = ["email", "in-app", "push"];

const CreateCampaignPopup: React.FC<CreateCampaignPopupProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { apiFetch } = useApi();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [avatar, setAvatar] = useState("");
  const [selectedCampaignType, setSelectedCampaignType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("");
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [showRecipientsPopup, setShowRecipientsPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // reset form when opened
    setTitle("");
    setBody("");
    setLink("");
    setAvatar("");
    setSelectedCampaignType("");
    setSelectedRecipients("");
    setShowCampaignPopup(false);
    setShowRecipientsPopup(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    if (!title.trim()) { toast.error("Please provide a title"); return false; }
    if (!body.trim()) { toast.error("Please provide a body"); return false; }
    if (!selectedCampaignType) { toast.error("Please select a campaign type"); return false; }
    if (!selectedRecipients) { toast.error("Please select recipients"); return false; }
    if (!avatar.trim()) { toast.error("Please provide an avatar"); return false; }
    return true;
  };

  const toSnakeCase = (val: string) => val.toLowerCase().replace(/[\s-]+/g, "_");

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      const payload = {
        title,
        body,
        link,
        type: selectedCampaignType.toLowerCase(), // "email" | "in-app" | "push"
        recipients: toSnakeCase(selectedRecipients), // "all_users" | "premium_users" | "specific_users"
        avatar,
      };

      const res = await apiFetch("/api/admin/campaign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Campaign created successfully");
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || "Failed to create campaign");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while creating the campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PopUp
      title="Create New Campaign"
      onClose={() => { if (!submitting) onClose(); }}
      children={
        <div className="flex flex-col gap-6 py-4 overflow-y-auto max-h-[60vh]">
          {/* Campaign Type */}
          <div className="relative px-10">
            <button
              onClick={() => setShowCampaignPopup(!showCampaignPopup)}
              disabled={submitting}
              className="w-full flex justify-between items-center p-3 border border-[#C3C6CF] rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <span className={`text-sm ${selectedCampaignType ? "text-[#1A1C1E]" : "text-[#73777F]"}`}>
                {selectedCampaignType || "Campaign Type"}
              </span>
              <FiChevronRight className="text-[#1A1C1E]" />
            </button>
            {showCampaignPopup && (
              <div className="absolute top-full left-10 right-10 mt-1 bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-50">
                {campaignTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedCampaignType(type); setShowCampaignPopup(false); }}
                    className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Recipients */}
          <div className="relative px-10">
            <button
              onClick={() => setShowRecipientsPopup(!showRecipientsPopup)}
              disabled={submitting}
              className="w-full flex justify-between items-center p-3 border border-[#C3C6CF] rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              <span className={`text-sm ${selectedRecipients ? "text-[#1A1C1E]" : "text-[#73777F]"}`}>
                {selectedRecipients || "Recipients"}
              </span>
              <FiChevronRight className="text-[#1A1C1E]" />
            </button>
            {showRecipientsPopup && (
              <div className="absolute top-full left-10 right-10 mt-1 bg-white border border-[#C3C6CF] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {recipientTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => { setSelectedRecipients(type); setShowRecipientsPopup(false); }}
                    className="w-full text-left p-3 hover:bg-[#F1F5F9] text-sm capitalize"
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>

          <hr className="mx-10 border-[#C3C6CF]" />

          {/* Title */}
          <div className="px-10">
            <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
              className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm disabled:opacity-50"
              placeholder="e.g. December Promo"
            />
          </div>

          {/* Body */}
          <div className="px-10 mb-2">
            <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={submitting}
              rows={6}
              className="w-full p-3 border  border-[#C3C6CF] rounded-lg text-sm resize-none disabled:opacity-50"
              placeholder="Write your message here..."
            />
          </div>

          {/* Link */}
          <div className="px-10">
            <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Link (Optional)</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={submitting}
              className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm disabled:opacity-50"
              placeholder="https://example.com"
            />
          </div>

          {/* Avatar */}
          <div className="px-10">
            <label className="block text-sm font-medium text-[#1A1C1E] mb-2">Avatar</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              disabled={submitting}
              className="w-full p-3 border border-[#C3C6CF] rounded-lg text-sm disabled:opacity-50"
              placeholder="e.g. test avatar"
            />
          </div>
        </div>
      }
      footer={
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className={`bg-[#0360AB] text-white px-6 py-2 rounded-lg hover:bg-[#035fabea] transition ${
            submitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {submitting ? "Sending..." : "Send Campaign"}
        </button>
      }
    />
  );
};

export default CreateCampaignPopup;
