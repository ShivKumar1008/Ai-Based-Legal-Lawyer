import { User, Scale, FileText, Download } from "lucide-react"

function ChatMessage({ content, role, timestamp, isTemplate, templateName }) {
  const formattedTime = timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={`chat-message ${role}`}>
      <div className="message-avatar">
        {role === "user" ? (
          <div className="avatar user-avatar">
            <User />
          </div>
        ) : (
          <div className="avatar assistant-avatar">
            <Scale />
          </div>
        )}
      </div>
      <div className="message-content">
        <div className="message-bubble">
          {content}

          {isTemplate && (
            <div className="template-preview">
              <div className="template-header">
                <FileText size={18} />
                <span>{templateName}</span>
              </div>
              <div className="template-content">
                <div className="template-placeholder">
                  {/* Simulated document content */}
                  <div className="doc-line"></div>
                  <div className="doc-line"></div>
                  <div className="doc-line short"></div>
                  <div className="doc-line"></div>
                  <div className="doc-line"></div>
                  <div className="doc-line short"></div>
                </div>
                <button className="template-download-btn">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="message-timestamp">{formattedTime}</div>
      </div>
    </div>
  )
}

export default ChatMessage

