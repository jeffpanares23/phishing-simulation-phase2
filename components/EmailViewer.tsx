
import React, { useState } from 'react';
// Fix: Import EmailData from types (was missing previously)
import { EmailData } from '../types';

interface EmailViewerProps {
  email: EmailData;
  showRedFlags?: boolean;
}

export const EmailViewer: React.FC<EmailViewerProps> = ({ email, showRedFlags = false }) => {
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm w-full max-w-2xl mx-auto overflow-hidden text-left mb-6">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2 text-sm">
          <span className="font-semibold text-gray-500">From:</span>
          {/* Fix: changed email.senderName to email.from to match data structure */}
          <span className="text-gray-900 font-medium">{email.from}</span>
          {/* Fix: changed email.senderEmail to email.email to match data structure */}
          <span className="text-gray-500">&lt;{email.email}&gt;</span>
        </div>
        <div className="flex items-center space-x-2 text-sm mt-1">
          <span className="font-semibold text-gray-500">Subject:</span>
          <span className="text-gray-900 font-semibold">{email.subject}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 email-content max-h-64 overflow-y-auto whitespace-pre-wrap text-gray-700 leading-relaxed text-sm">
        {email.body}
        
        {/* Fix: changed email.hoverLink to email.hoverUrl to match data structure */}
        {email.hoverUrl && (
          <div className="mt-6">
            <span 
              className="text-blue-600 underline cursor-pointer relative"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              {email.linkText || 'Click here to verify account'}
              {isHoveringLink && (
                <div className="absolute -top-10 left-0 bg-black text-white px-3 py-1 text-xs rounded shadow-lg whitespace-nowrap z-50">
                  {email.hoverUrl}
                </div>
              )}
            </span>
          </div>
        )}
      </div>

      {/* Red Flags Overlay */}
      {showRedFlags && email.isPhishing && email.redFlags && (
        <div className="p-4 bg-[#D4AF37]/10 border-t border-[#D4AF37]/30">
          <h4 className="font-heading text-[#800000] text-lg mb-2">IDENTIFIED RED FLAGS</h4>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {email.redFlags.map((flag, idx) => (
              <li key={idx} className="flex items-center text-xs text-gray-800">
                <span className="w-1.5 h-1.5 bg-[#800000] rounded-full mr-2"></span>
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
