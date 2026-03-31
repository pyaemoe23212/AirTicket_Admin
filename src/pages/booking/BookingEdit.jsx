import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  getBookingById,
  replaceBookingTicketFile,
  deleteBookingTicketFile 
} from "../../config/api";
import { useAuth } from "../../contexts/AuthContext";

export default function BookingEdit() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketFile, setTicketFile] = useState(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileError, setFileError] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchBooking = async () => {
      try {
        const data = await getBookingById(bookingId);
        if (mounted) {
          setBooking(data);
          if (data.ticket_file) {
            setCurrentFile(data.ticket_file);
          }
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchBooking();

    return () => {
      mounted = false;
    };
  }, [bookingId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setTicketFile(file);
      setFileError(null);
    }
  };

  const handleReplaceFile = async () => {
    if (!ticketFile) {
      setFileError("Please select a file to upload");
      return;
    }

    setFileUploading(true);
    setFileError(null);

    try {
      await replaceBookingTicketFile(
        bookingId,
        ticketFile,
        user?.name || "System"
      );
      alert("Ticket file replaced successfully");
      setTicketFile(null);
      setCurrentFile({
        name: ticketFile.name,
        uploadedAt: new Date().toLocaleString(),
      });
      document.getElementById("fileInput").value = "";
    } catch (err) {
      setFileError("Failed to replace file: " + err.message);
    } finally {
      setFileUploading(false);
    }
  };

  const handleDeleteFile = async () => {
    if (!window.confirm("Are you sure you want to delete the ticket file?")) {
      return;
    }

    setFileUploading(true);
    setFileError(null);

    try {
      await deleteBookingTicketFile(bookingId, user?.name || "System");
      alert("Ticket file deleted successfully");
      setCurrentFile(null);
      setTicketFile(null);
    } catch (err) {
      setFileError("Failed to delete file: " + err.message);
    } finally {
      setFileUploading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;
  if (!booking) return <div className="p-6 text-center">Booking not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Booking</h2>
      <p className="text-gray-600 mb-8">Booking ID: <span className="font-semibold">{bookingId}</span></p>

      {/* Ticket File Management */}
      <section className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
          Ticket File Management
        </h3>
        
        {/* Current File Display */}
        {currentFile && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-2">Current File:</p>
            <p className="text-gray-800 font-medium">
              📄 {currentFile.name || "Ticket File"}
            </p>
            {currentFile.uploadedAt && (
              <p className="text-xs text-gray-600">
                Uploaded: {currentFile.uploadedAt}
              </p>
            )}
          </div>
        )}

        {/* File Upload Section */}
        <div className="p-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {currentFile ? "Replace Ticket File" : "Upload Ticket File"}
          </label>
          
          <div className="flex items-center gap-4 mb-4">
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              type="button"
              onClick={handleReplaceFile}
              disabled={!ticketFile || fileUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
            >
              {fileUploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {ticketFile && (
            <p className="text-xs text-gray-600">
              Selected: {ticketFile.name}
            </p>
          )}

          <p className="text-xs text-gray-500 mt-2">
            Accepted formats: PDF, JPG, JPEG, PNG, DOC, DOCX
          </p>
        </div>

        {/* Delete Button - Always Visible */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleDeleteFile}
            disabled={fileUploading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm disabled:opacity-50"
          >
            {fileUploading ? "Deleting..." : "Delete File"}
          </button>
        </div>

        {fileError && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{fileError}</p>
          </div>
        )}
      </section>

      {/* Action Button */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/bookings")}
          className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>
    </div>
  );
}