import React from "react";

function bottom() {
  return (
    <div className="pt-10 mt-0">
      <h1 class="text-center mb-4 text-3xl font-bold text-heading md:text-5xl lg:text-6xl">
        <span class="text-transparent bg-clip-text bg-linear-to-r to-emerald-600 from-sky-400">
          Better Content
        </span>{" "}
        Resources
      </h1>
      <p class=" text-center text-lg font-normal text-body lg:text-xl">
        Here at Resare we focus on Students and creators where technology,
        innovation, where you can share content and increase profile visit{" "}
      </p>

      <div class="flex items-center justify-center w-200 ml-150 mt-10 mb-10 bg-blue-300">
        <label
          for="dropzone-file"
          class="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
        >
          <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
            <svg
              class="w-8 h-8 mb-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
              />
            </svg>
            <p class="mb-2 text-sm">
              <span class="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p class="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
          </div>
          <input id="dropzone-file" type="file" class="hidden" />
        </label>
      </div>

      <ul class="space-y-4 text-body items-center text-center ml-150">
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-fg-success shrink-0 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>Individual share its Resources</span>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-fg-success shrink-0 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>
            users access but must visit your profile to increase sharer profile
            views on its social apps..
          </span>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-fg-success shrink-0 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>
            Every user{" "}
            <span class="font-medium text-heading">
              is a Student share resources that matters
            </span>
          </span>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-fg-success shrink-0 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>
            profile lock <span class="font-medium text-heading">3 months</span>
          </span>
        </li>
        <li class="flex items-center space-x-3 rtl:space-x-reverse">
          <svg
            class="w-4 h-4 text-fg-success shrink-0 me-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>
            Free updates:{" "}
            <span class="font-medium text-heading">every time;</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default bottom;
