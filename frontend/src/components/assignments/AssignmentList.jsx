import {MdAssignment, MdBook, MdCalendarToday, MdPerson, MdAttachFile} from "react-icons/md";

export default function AssignmentList({ assignments }) {
  if (!assignments?.length) {
    return (
      <p className="text-center text-lg text-gray-500 mt-12">
        No assignments to show.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      {assignments.map((a) => (
        <div
          key={a._id}
          className="
            bg-white p-6 rounded-2xl shadow-md
            border border-gray-100
            transform transition-all duration-200
            hover:-translate-y-1 hover:shadow-lg
            w-full
          "
        >
          {/* Title + View Link */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MdAssignment className="text-3xl text-[#FF6F91]" />
              <h3 className="text-2xl font-semibold text-gray-800">
                {a.title}
              </h3>
            </div>
            {a.fileUrl && (
              <a
                href={a.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-1
                  text-[#FF6F91] hover:text-red-600
                  text-sm font-medium
                "
              >
                View File
                <MdAttachFile className="text-lg" />
              </a>
            )}
          </div>

          {/* Details */}
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <MdBook className="text-xl text-[#FF6F91]" />
              <span className="font-medium">Subject:</span> {a.subject}
            </li>
            <li className="flex items-center gap-2">
              <MdCalendarToday className="text-xl text-[#FF6F91]" />
              <span className="font-medium">Deadline:</span>{" "}
              {new Date(a.dueDate).toLocaleDateString()}
            </li>
            <li className="flex items-center gap-2">
              <MdPerson className="text-xl text-[#FF6F91]" />
              <span className="font-medium">Instructor:</span>{" "}
              {a.uploader?.name || "—"}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
