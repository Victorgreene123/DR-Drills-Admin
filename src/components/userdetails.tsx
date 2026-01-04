import { useEffect, useRef, useState } from "react";
import  { forwardRef } from "react";
import { LiaTimesSolid } from "react-icons/lia";

import { FaChevronRight } from "react-icons/fa";

import { LuMailPlus } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa6";
import { formatReadableDate } from "../utils/formatDate";
import { LoadingAnimation } from "../pages/QuizBlocksScreen";
import { useApi } from "../hooks/useApi";
import toast from 'react-hot-toast';

interface UserDetailsPanelProps {
  id: any;
  data: any[];
  details: any;
  loadingDetails: boolean;
  onClose: () => void;
  onPreview?: () => void;
  badge?: string;
  thumbnail?: string;
  payment_history?: any[];
  
}



//  {
//                 "id": 21,
//                 "user_id": 8,
//                 "firstname": "Lea",
//                 "surname": "Miller",
//                 "avatar": "https://i.pravatar.cc/300?img=18",
//                 "university": 4,
//                 "school_name": "University of California, San Francisco School of Medicine",
//                 "score": 95,
//                 "time_taken": 841,
//                 "questions_attempted": 12,
//                 "questions_correct": 6,
//                 "completed_at": "2025-09-15T10:58:10.000Z",
//                 "rank": 1,
//                 "is_top_score": 1
//             },


// "payment_history": [
//             {
//                 "transaction_id": 73,
//                 "amount": "4000.00",
//                 "payment_method": "card",
//                 "payment_gateway": "paystack",
//                 "status": "success",
//                 "created_at": "2026-01-02T00:48:18.000Z",
//                 "subscription_type": "monthly",
//                 "premium_expiry": "2026-02-02T00:48:28.000Z"
//             }

const UserDetailsPanel = forwardRef<HTMLDivElement, UserDetailsPanelProps>(
  (
    {
      id,
      data,
      details,
      loadingDetails,
      onClose,
      badge,
      payment_history
    },
    ref
  ) => {
    const { apiFetch } = useApi();
    const dataItem = data.find((item) => item.id === id);
    const showPremiumRef = useRef<HTMLDivElement | null>(null);
    const resetPasswordRef = useRef<HTMLDivElement | null>(null);
    
    const [view, setView] = useState<"details" | "history">("details");
    const [showAddPremiumModal, setShowAddPremium] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [validityPeriod, setValidityPeriod] = useState<number>(7);
    const [newPassword, setNewPassword] = useState("");
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (showPremiumRef.current && !showPremiumRef.current.contains(event.target as Node)) {
          setShowAddPremium(false);
        }
        if (resetPasswordRef.current && !resetPasswordRef.current.contains(event.target as Node)) {
          setShowResetPasswordModal(false);
          setNewPassword('');
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!dataItem) return null;

    // Suspend User
    const handleSuspendUser = async () => {
      if (!window.confirm('Are you sure you want to suspend this user?')) return;

      try {
        setActionLoading('suspend');
        const res = await apiFetch(`/api/admin/users/${id}/block`, {
          method: 'POST',
        });

        const result = await res.json();

        if (res.ok) {
          toast.success('User suspended successfully');
        } else {
          toast.error(result.message || 'Failed to suspend user');
        }
      } catch (error) {
        console.error('Error suspending user:', error);
        toast.error('An error occurred while suspending user');
      } finally {
        setActionLoading(null);
      }
    };

    // Activate User
    const handleActivateUser = async () => {
      try {
        setActionLoading('activate');
        const res = await apiFetch(`/api/admin/users/${id}/unblock`, {
          method: 'POST',
        });

        const result = await res.json();

        if (res.ok) {
          toast.success('User activated successfully');
        } else {
          toast.error(result.message || 'Failed to activate user');
        }
      } catch (error) {
        console.error('Error activating user:', error);
        toast.error('An error occurred while activating user');
      } finally {
        setActionLoading(null);
      }
    };

    // Force Logout
    const handleForceLogout = async () => {
      if (!window.confirm('Are you sure you want to force logout this user?')) return;

      try {
        setActionLoading('logout');
        const res = await apiFetch(`/api/admin/users/${id}/force-logout`, {
          method: 'POST',
        });

        const result = await res.json();

        if (res.ok) {
          toast.success('User logged out successfully');
        } else {
          toast.error(result.message || 'Failed to logout user');
        }
      } catch (error) {
        console.error('Error logging out user:', error);
        toast.error('An error occurred while logging out user');
      } finally {
        setActionLoading(null);
      }
    };

    // Delete User
    const handleDeleteUser = async () => {
      const confirmText = prompt(
        'This action is irreversible. Type "DELETE" to confirm account deletion:'
      );

      if (confirmText !== 'DELETE') {
        if (confirmText !== null) {
          toast.error('Account deletion cancelled');
        }
        return;
      }

      try {
        setActionLoading('delete');
        const res = await apiFetch(`/api/admin/users/${id}/delete`, {
          method: 'DELETE',
        });

        const result = await res.json();

        if (res.ok) {
          toast.success('User account deleted successfully');
          onClose();
        } else {
          toast.error(result.message || 'Failed to delete user');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('An error occurred while deleting user');
      } finally {
        setActionLoading(null);
      }
    };

    // Reset Password
    const handleResetPassword = async () => {
      if (!newPassword.trim()) {
        toast.error('Please enter a new password');
        return;
      }

      if (newPassword.length < 8) {
        toast.error('Password must be at least 8 characters');
        return;
      }

      try {
        setActionLoading('reset-password');
        const res = await apiFetch(`/api/admin/users/${id}/reset-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: newPassword }),
        });

        const result = await res.json();

        if (res.ok) {
          toast.success('Password reset successfully');
          setShowResetPasswordModal(false);
          setNewPassword('');
        } else {
          toast.error(result.message || 'Failed to reset password');
        }
      } catch (error) {
        console.error('Error resetting password:', error);
        toast.error('An error occurred while resetting password');
      } finally {
        setActionLoading(null);
      }
    };

    return (
      <div
        ref={ref}
        className="absolute top-1/8 right-20 h-[85vh] w-[410px] bg-white rounded-[8px] shadow-lg border-[1px] border-[#C3C6CF] z-[1500] flex flex-col"
      >
        {/* Add Premium Subscription Modal */}
        {showAddPremiumModal && (
          <div className="shadow-lg border-[1px] border-[#C3C6CF] z-[1500] bg-white absolute left-[-310px] top-1/3 w-[300px] rounded-[8px] h-[180px]" ref={showPremiumRef}>
            <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
              <h2 className="text-center font-semibold text-[16px] text-[#0360AB]">
                Add Premium Subscription
              </h2>
              <button
                onClick={() => setShowAddPremium(false)}
                className="w-6 absolute top-2 right-5 h-6 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
                aria-label="Close"
              >
                <LiaTimesSolid className="text-[#1A1C1E] text-sm" />
              </button>
            </div>

            <div className="p-2">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-[16px] font-medium text-[#1A1C1E]">Validity Period (Days)</label>
                <input
                  type="number"
                  className="border border-[#C3C6CF] rounded-lg p-3 text-sm cursor-pointer"
                  value={validityPeriod}
                  onChange={(e) => setValidityPeriod(Number(e.target.value))}
                />
              </div>

              <button className="w-full text-white bg-[#0360AB] rounded-md py-2">
                Add Subscription
              </button>
            </div>
          </div>
        )}

        {/* Reset Password Modal */}
        {showResetPasswordModal && (
          <div className="shadow-lg border-[1px] border-[#C3C6CF] z-[1500] bg-white absolute left-[-310px] top-1/3 w-[300px] rounded-[8px] h-[220px]" ref={resetPasswordRef}>
            <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF]">
              <h2 className="text-center font-semibold text-[16px] text-[#0360AB]">
                Reset User Password
              </h2>
              <button
                onClick={() => {
                  setShowResetPasswordModal(false);
                  setNewPassword('');
                }}
                className="w-6 absolute top-2 right-5 h-6 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
                aria-label="Close"
              >
                <LiaTimesSolid className="text-[#1A1C1E] text-sm" />
              </button>
            </div>

            <div className="p-3">
              <div className="flex flex-col gap-2 mb-4 w-full">
                <label className="text-[14px] font-medium text-[#1A1C1E]">New Password</label>
                <input
                  type="password"
                  className="border border-[#C3C6CF] rounded-lg p-3 text-sm"
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={8}
                />
                <p className="text-xs text-[#73777F]">Password must be at least 8 characters</p>
              </div>

              <button
                onClick={handleResetPassword}
                disabled={actionLoading === 'reset-password'}
                className="w-full text-white bg-[#0360AB] rounded-md py-2 hover:bg-[#035fabea] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {actionLoading === 'reset-password' ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="w-full p-2 bg-[#F8F9FF] border-y-[1px] relative rounded-t-[8px] border-[#C3C6CF] flex-shrink-0">
          <h2 className="text-center font-semibold text-[18px] text-[#0360AB]">
            {view === "details" ? "User Details" : "Payment History"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 absolute top-2 right-5 h-8 flex items-center justify-center bg-[#ECEDF4] rounded-full hover:bg-[#d1d3db] transition"
            aria-label="Close"
          >
            <LiaTimesSolid className="text-[#1A1C1E] text-xl" />
          </button>
        </div>

        {/* User Info */}
        <div className="w-full gap-4 flex items-start px-4 mt-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={dataItem?.image ?? badge} alt="" className={`w-12 h-12 rounded-full ${dataItem.premium === 1 && "border-4 border-[#004883]"}`} />
            <div>
              <h2 className="text-[#1A1C1E] text-[18px] font-semibold leading-tight">{dataItem.title}</h2>
              <h5 className="text-[#43474E] flex items-center gap-2">{dataItem.email} <LuMailPlus /></h5>
              <h6 className="text-[12px] text-[#73777F]">Last Seen: {dataItem.lastSeen}</h6>
            </div>
          </div>
        </div>

        {/* Main view switch */}
        {view === "details" ? (
          <div className="flex-1 w-full py-6 px-4 flex flex-col overflow-y-auto">
            {loadingDetails ? (
              <div className="text-xs text-gray-400 mt-3">Loading details...</div>
            ) : details ? (
              <>
                <h4 className="font-semibold">Basic Information</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <p className="flex items-center">{details.university || "No university"} <GoDotFill /></p>
                  <p className="flex items-center">{`${details.level} level` || "No data"} <GoDotFill /></p>
                  <p>{details.dept || "No Data"}</p>
                </div>
              </>
            ) : null}

            {/* Stats */}
            <div className="flex gap-2 mt-4">
              <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
                <span className="text-[12px] text-[#73777F]">Avg. monthly Visits:</span>
                <span className="text-[16px] font-semibold text-[#1A1C1E]">
                  {dataItem.avgMonthlyVisits ?? "30,000"}
                </span>
              </div>
              <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
                <span className="text-[12px] text-[#73777F]">Total Visits</span>
                <span className="text-[16px] font-semibold text-[#1A1C1E]">
                  {dataItem.totalVisits ?? "30,000"}
                </span>
              </div>
              <div className="flex-1 bg-[#ECEDF4] rounded-[6px] p-3 flex flex-col items-center">
                <span className="text-[12px] text-[#73777F]">Average Score</span>
                <span className="text-[16px] font-semibold text-[#1A1C1E]">
                  {dataItem.averageScore ?? "70%"}
                </span>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="p-2 space-y-2 mt-2">
              <h4 className="font-semibold">Payment</h4>
              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition"
                onClick={() => setView("history")}
              >
                View History
                <FaChevronRight />
              </button>
              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium"
              >
                Next Billing Date: {loadingDetails ? "loading..." : details?.premium_details ? formatReadableDate(details.premium_details.premium_expiry) : "--"}
                <FaChevronRight />
              </button>
              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition"
                onClick={() => setShowAddPremium(true)}
              >
                Add Premium Subscription
                <FaChevronRight />
              </button>
            </div>

            {/* Account Actions */}
            <div className="p-2 space-y-2 mt-2">
              <h4 className="font-semibold">Account</h4>
              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition disabled:opacity-50"
                onClick={handleSuspendUser}
                disabled={actionLoading === 'suspend'}
              >
                {actionLoading === 'suspend' ? 'Suspending...' : 'Suspend Account'}
                <FaChevronRight />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition disabled:opacity-50"
                onClick={handleActivateUser}
                disabled={actionLoading === 'activate'}
              >
                {actionLoading === 'activate' ? 'Activating...' : 'Activate Account'}
                <FaChevronRight />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition disabled:opacity-50"
                onClick={handleForceLogout}
                disabled={actionLoading === 'logout'}
              >
                {actionLoading === 'logout' ? 'Logging Out...' : 'Force Logout'}
                <FaChevronRight />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-[#ECEDF4] text-[#1A1C1E] font-medium hover:bg-[#d1d3db] transition"
                onClick={() => setShowResetPasswordModal(true)}
              >
                Reset Password
                <FaChevronRight />
              </button>

              <button
                className="w-full flex items-center justify-between px-3 py-1 rounded bg-red-100 text-red-800 font-medium hover:bg-red-200 transition disabled:opacity-50"
                onClick={handleDeleteUser}
                disabled={actionLoading === 'delete'}
              >
                {actionLoading === 'delete' ? 'Deleting...' : 'Delete Account'}
                <FaChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 py-4 px-4 overflow-y-auto">
            <button className="flex items-center gap-2 mb-4 text-[14px]" onClick={() => setView("details")}>
              <FaArrowLeft /> Back
            </button>

            <div>
              <h4 className="font-semibold">Payment History</h4>
              {loadingDetails ? (
                <LoadingAnimation />
              ) : payment_history && payment_history.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {payment_history.map((ph: any) => (
                    <div key={ph.transaction_id ?? ph.created_at} className="flex items-center w-full justify-between bg-[#F8F9FF] p-3 rounded">
                      <div>
                        <p className="text-[14px]">{formatReadableDate(ph.created_at)}</p>
                        <p className="text-[12px] text-[#73777F]">{ph.premium_expiry ? `exp: ${formatReadableDate(ph.premium_expiry)}` : ''}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px]">{ph.subscription_type ? `${ph.subscription_type[0].toUpperCase()}${ph.subscription_type.slice(1)} Subscription` : 'Subscription'}</p>
                        {ph.amount && <p className="text-[12px] text-[#73777F]">Amount: {ph.amount}</p>}
                        {ph.payment_method && <p className="text-[12px] text-[#73777F]">Method: {ph.payment_method}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-[#73777F] mt-2">No Data Available</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default UserDetailsPanel;
