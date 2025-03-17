import { MessageSquare, FileText, Users, Settings, HelpCircle } from "lucide-react"

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <a href="#">
                <MessageSquare />
                <span>Ask a Lawyer</span>
              </a>
            </li>
            <li>
              <a href="#">
                <FileText />
                <span>Legal Documents</span>
              </a>
            </li>
            <li>
              <a href="#">
                <Users />
                <span>Consult a Human Lawyer</span>
              </a>
            </li>
            <li className="separator"></li>
            <li>
              <a href="#">
                <Settings />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a href="#">
                <HelpCircle />
                <span>Help & Support</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar

