import React, { useEffect, useState } from "react";
import PopUp from "./PopUp";
import { FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useApi } from "../../hooks/useApi";

interface Campaign {
  id: number;
  avatar: string;
  admin_id: number;
  title: string;
  type: string; // "email" | "in-app" | "push"
  published: number;
  recipients: string; // e.g. "all_users"
  created_at: string;
  clicks: number;
  body: string;
  link: string;
}

interface EditCampaignPopupProps {
  isOpen: boolean;
  campaign: Campaign | null;
  onClose: () => void;
  onSuccess: () => void; // refresh parent list
}

const recipientTypes = [
  "all users",
  "free users",
  "premium users",
  "unfrequent users",
  "power users",
  "new sign ups",
];

const campaignTypes = ["email", "in-app", "push"];

const EditCampaignPopup: React.FC<EditCampaignPopupProps> = ({
  isOpen,
  campaign,
  onClose,
  onSuccess,
}) => {
  const { apiFetch } = useApi();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [selectedCampaignType, setSelectedCampaignType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("");
  const [showCampaignPopup, setShowCampaignPopup] = useState(false);
  const [showRecipientsPopup, setShowRecipientsPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    // Prefill fields from campaign
    setTitle(campaign?.title || "");
    setBody(campaign?.body || "");
    setLink(campaign?.link || "");
    setSelectedCampaignType(campaign?.type || "");
    setSelectedRecipients(campaign?.recipients?.replace(/_/g, " ") || "");
    setShowCampaignPopup(false);
    setShowRecipientsPopup(false);
  }, [isOpen, campaign]);

  if (!isOpen || !campaign) return null;

  const validate = () => {
    if (!title.trim()) {
      toast.error("Please provide a title");
      return false;
    }
    if (!body.trim()) {
      toast.error("Please provide a body");
      return false;
    }
    if (!selectedCampaignType) {
      toast.error("Please select a campaign type");
      return false;
    }
    if (!selectedRecipients) {
      toast.error("Please select recipients");
      return false;
    }
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
        type: selectedCampaignType.toLowerCase(), // keep as is or normalize
        recipients: toSnakeCase(selectedRecipients),
      };

      const res = await apiFetch(`/api/admin/campaign/${campaign.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Campaign updated successfully");
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || "Failed to update campaign");
      }
    } catch (e) {
      console.error(e);
      toast.error("An error occurred while updating the campaign");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PopUp
      title="Edit Campaign"
      onClose={() => {
        if (!submitting) onClose();
      }}
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
                    onClick={() => {
                      setSelectedCampaignType(type);
                      setShowCampaignPopup(false);
                    }}
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
                    onClick={() => {
                      setSelectedRecipients(type);
                      setShowRecipientsPopup(false);
                    }}
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
              placeholder="e.g. New Quiz Block Available!"
            />
          </div>

          {/* Body */}
          <div className="px-10 mb-6 pb-4">
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
          {submitting ? "Updating..." : "Update Campaign"}
        </button>
      }
    />
  );
};

export default EditCampaignPopup;
