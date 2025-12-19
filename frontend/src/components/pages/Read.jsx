import React from 'react'

function Read() {
  return (
  <div>
<div className="text-center max-w-4xl mx-auto mt-40">
<img src=" https://images.unsplash.com/photo-1642775073532-65020022b8d0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="mx-auto w-72 h-auto text-gray-800 dark:text-white"  />

  <h2 className="text-2xl font-bold mb-6">
    How This Platform Works
  </h2>

  <p className="mb-4 text-body">
    This application is a creator-focused file-sharing platform where individuals can upload and share valuable PDFs and ZIP resources in an organized and secure way. It is built for students, developers, and learners who want direct access to high-quality content from trusted creators instead of random downloads from the internet.
  </p>

  <p className="mb-4 text-body">
    Creators can choose to make their files public or lock them behind a <strong>follow-to-unlock</strong> system. When a file is locked, users must follow the creator and visit their linked social profile such as Instagram or Twitter to gain access. This creates a fair exchange where creators receive genuine support and visibility for their work.
  </p>

  <p className="mb-4 text-body">
    To prevent misuse, the platform includes a 30-day follow lock. Once a user unlocks content, they cannot unfollow the creator for 30 days. If they attempt to unfollow early, access to all locked files from that creator is revoked. This system ensures long-term engagement instead of temporary or fake follows.
  </p>

  <p className="mb-4 text-body">
    Every interaction—file uploads, downloads, follows, and unlock actions—is securely tracked. This gives creators transparency and control, while users enjoy a smooth, trustworthy experience. The goal is to build a balanced ecosystem where knowledge sharing and creator growth happen together.
  </p>

</div>
<div className='flex items-center justify-center mt-20 mb-20'>  
<h1 className='text-center mt-10 text-4xl p-5 bg-sky-400 text-white rounded-lg w-sm'>INSTALL NOW</h1>
</div>
 </div>
    
  )
}

export default Read