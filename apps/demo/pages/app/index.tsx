import formbricks from "@formbricks/js";
import Image from "next/image";
import { useEffect, useState } from "react";
import fbsetup from "../../public/fb-setup.png";
import PersonDetails from "@/pages/app/personDetails";

export default function AppPage({}) {
  const [darkMode, setDarkMode] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="h-[100vh] bg-white px-12 py-6 dark:bg-slate-800">
      <div className="flex flex-col justify-between md:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Formbricks In-product Survey Demo App
          </h1>
          <p className="text-slate-700 dark:text-slate-300">
            This app helps you test your in-app surveys. You can create and test user actions, create and
            update user attributes, etc.
          </p>
        </div>
        <button
          className="mt-2 rounded-lg bg-slate-200 px-6 py-1 dark:bg-slate-700 dark:text-slate-100"
          onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>
      </div>

      <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="rounded-lg border border-slate-300 bg-slate-100 p-6 dark:border-slate-600 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">1. Setup .env</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Copy the environment ID of your Formbricks app to the env variable in demo/.env
            </p>
            <Image src={fbsetup} alt="fb setup" className="mt-4 rounded" priority />

            <div className="mt-4 flex-col items-start text-sm text-slate-700 dark:text-slate-300 sm:flex sm:items-center sm:text-base">
              <p className="mb-1 sm:mb-0 sm:mr-2">You&apos;re connected with env:</p>
              <div className="flex items-center">
                <strong className="w-32 truncate sm:w-auto">
                  {process.env.NEXT_PUBLIC_FORMBRICKS_ENVIRONMENT_ID}
                </strong>
                <span className="relative ml-2 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-slate-300 bg-slate-100 p-6 dark:border-slate-600 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">2. Widget Logs</h3>
            <p className="text-slate-700 dark:text-slate-300">
              Look at the logs to understand how the widget works.{" "}
              <strong className="dark:text-white">Open your browser console</strong> to see the logs.
            </p>
            {/* <div className="max-h-[40vh] overflow-y-auto py-4">
              <LogsContainer />
            </div> */}
          </div>
          <div className="mt-4 rounded-lg border border-slate-300 bg-slate-100 p-6 dark:border-slate-600 dark:bg-slate-900">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">3. Person Details</h3>
            <p className="text-slate-700 dark:text-slate-300">
              The formbricks widget collects data about each person using an app. Since you are using the demo
              app right now its colelction your data.
            </p>
            <PersonDetails refreshKey={refreshKey} />
          </div>
        </div>

        <div className="md:grid md:grid-cols-3">
          <div className="col-span-3 rounded-lg border border-slate-300 bg-slate-100 p-6 dark:border-gray-600 dark:bg-gray-800">
            <h3 className="text-lg font-semibold dark:text-white">Widget Controls</h3>
            <p className="text-slate-700 dark:text-gray-300">
              The widget can perform a Sync, Reset and Logout.
            </p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <button
                  className="my-4 w-full rounded-lg bg-slate-500 px-6 py-3 text-white hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={() => {
                    formbricks.performSync();
                  }}>
                  Sync
                </button>
                <p className="text-xs text-slate-700 dark:text-gray-300">
                  Syncs the system&apos;s current state with the backend and updates the user session.
                </p>
              </div>
              <div>
                <button
                  className="my-4 w-full rounded-lg bg-slate-500 px-6 py-3 text-white hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={async () => {
                    await formbricks.reset();
                    setRefreshKey((prevKey) => prevKey + 1);
                  }}>
                  Reset
                </button>
                <p className="text-xs text-slate-700 dark:text-gray-300">
                  Resets the state / person <strong>and</strong> requests a new state / person from the server
                  (i.e. a new unidentified user will appear in your Person view).
                </p>
              </div>
              <div>
                <button
                  className="my-4 w-full rounded-lg bg-slate-500 px-6 py-3 text-white hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={() => {
                    formbricks.logout();
                  }}>
                  Logout
                </button>
                <p className="text-xs text-slate-700 dark:text-gray-300">
                  Resets the state / person <strong>without</strong> getting a new state / person from the
                  server (the current user will be logged out).
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div>
              <button
                className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                onClick={() => {
                  formbricks.track("Code Action");
                }}>
                Code Action
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sends a{" "}
                <a href="https://formbricks.com/docs/actions/code" className="underline" target="_blank">
                  Code Action
                </a>{" "}
                to the Formbricks API called &apos;Code Action&apos;. You will find it in the Actions Tab.
              </p>
            </div>
          </div>
          <div className="p-6">
            <div>
              <button className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700  dark:bg-gray-700 dark:hover:bg-gray-600">
                No-Code Action
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sends a{" "}
                <a
                  href="https://formbricks.com/docs/actions/no-code"
                  className="underline dark:text-blue-500"
                  target="_blank">
                  No Code Action
                </a>{" "}
                as long as you created it beforehand in the Formbricks App.{" "}
                <a
                  href="https://formbricks.com/docs/actions/no-code"
                  target="_blank"
                  className="underline dark:text-blue-500">
                  Here are instructions on how to do it.
                </a>
              </p>
            </div>
          </div>
          <div className="p-6">
            <div>
              <button
                onClick={async () => {
                  await formbricks.setAttribute("Plan", "Free");
                  setRefreshKey((prevKey) => prevKey + 1);
                }}
                className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700  dark:bg-gray-700 dark:hover:bg-gray-600">
                Set Plan to &apos;Free&apos;
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sets the{" "}
                <a
                  href="https://formbricks.com/docs/attributes/custom-attributes"
                  target="_blank"
                  className="underline dark:text-blue-500">
                  attribute
                </a>{" "}
                &apos;Plan&apos; to &apos;Free&apos;. If the attribute does not exist, it creates it.
              </p>
            </div>
          </div>
          <div className="p-6">
            <div>
              <button
                onClick={async () => {
                  await formbricks.setAttribute("Plan", "Paid");
                  setRefreshKey((prevKey) => prevKey + 1);
                }}
                className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700  dark:bg-gray-700 dark:hover:bg-gray-600">
                Set Plan to &apos;Paid&apos;
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sets the{" "}
                <a
                  href="https://formbricks.com/docs/attributes/custom-attributes"
                  target="_blank"
                  className="underline dark:text-blue-500">
                  attribute
                </a>{" "}
                &apos;Plan&apos; to &apos;Paid&apos;. If the attribute does not exist, it creates it.
              </p>
            </div>
          </div>
          <div className="p-6">
            <div>
              <button
                onClick={async () => {
                  await formbricks.setEmail("test@web.com");
                  setRefreshKey((prevKey) => prevKey + 1);
                }}
                className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700  dark:bg-gray-700 dark:hover:bg-gray-600">
                Set Email
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sets the{" "}
                <a
                  href="https://formbricks.com/docs/attributes/identify-users"
                  target="_blank"
                  className="underline dark:text-blue-500">
                  user email
                </a>{" "}
                &apos;test@web.com&apos;
              </p>
            </div>
          </div>
          <div className="p-6">
            <div>
              <button
                onClick={async () => {
                  try {
                    await formbricks.setUserId("THIS-IS-A-USER-ID-FOR-TESTING");
                    setRefreshKey((prevKey) => prevKey + 1);
                  } catch (error) {}
                }}
                className="mb-4 rounded-lg bg-slate-800 px-6 py-3 text-white hover:bg-slate-700  dark:bg-gray-700 dark:hover:bg-gray-600">
                Set User ID
              </button>
            </div>
            <div>
              <p className="text-xs text-slate-700 dark:text-gray-300">
                This button sets an external{" "}
                <a
                  href="https://formbricks.com/docs/attributes/identify-users"
                  target="_blank"
                  className="underline dark:text-blue-500">
                  user ID
                </a>{" "}
                to &apos;THIS-IS-A-USER-ID-FOR-TESTING&apos;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
