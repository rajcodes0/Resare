import React, { useState } from "react";
import { BookOpen, Users, Download, Share2 } from "lucide-react";

function LoggedHome() {
  const [resources] = useState([
    {
      id: 1,
      category: "Web Development",
      title: "Complete JavaScript Guide",
      description:
        "A comprehensive resource covering JavaScript fundamentals, ES6+, async programming, and modern frameworks for beginners to advanced learners.",
      sharedBy: "Sarah Johnson",
      downloads: 1234,
      type: "PDF Guide",
    },
    {
      id: 2,
      category: "Data Science",
      title: "Python for Data Analysis",
      description:
        "Step-by-step tutorials covering pandas, numpy, matplotlib, and machine learning basics with real-world datasets.",
      sharedBy: "Michael Chen",
      downloads: 892,
      type: "Jupyter Notebooks",
    },
    {
      id: 3,
      category: "UI/UX Design",
      title: "Design System Masterclass",
      description:
        "Learn how to create scalable design systems with Figma, including components, color theory, and accessibility.",
      sharedBy: "Emily Rodriguez",
      downloads: 1567,
      type: "Video Course",
    },
  ]);

  return (
    <div className="min-h-screen pt-40 bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 py-12 px-4">
      {/* Search */}
      <form className="w-full max-w-xl mx-auto mb-16">
        <div className="relative">
          <input
            type="search"
            placeholder="Search resources..."
            className="w-full p-3 pl-10 rounded-lg border text-sm focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="button"
            className="absolute right-2 top-2 bg-indigo-600 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Search
          </button>
        </div>
      </form>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community Learning Resources
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover and share educational materials crafted by our learning
            community.
          </p>

          <div className="flex justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              1,245 Contributors
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600" />
              12,847 Downloads
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-xs">
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {resource.category}
                  </span>
                  <span className="text-gray-500">{resource.type}</span>
                </div>

                <h3 className="text-xl font-bold">{resource.title}</h3>
                <p className="text-gray-600">{resource.description}</p>

                <div className="flex items-center gap-3 pt-3 border-t">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-semibold">
                    {resource.sharedBy.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Shared by</p>
                    <p className="text-sm font-medium">
                      {resource.sharedBy}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Download className="w-4 h-4" />
                    {resource.downloads}
                  </span>
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Access
                  </button>
                  <button className="bg-gray-100 p-2 rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Have Resources to Share?
          </h2>
          <p className="mb-6 text-indigo-100">
            Upload your resources and help the community grow.
          </p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto">
            <Share2 className="w-5 h-5" />
            Upload Resource
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoggedHome;
