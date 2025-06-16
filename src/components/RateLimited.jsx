import { ZapIcon } from "lucide-react";

const RateLimited = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-primary/10 border border-primary/20 rounded-2xl shadow-lg p-6 md:p-8 animate-fade-in">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/20 p-3 rounded-full">
            <ZapIcon className="w-20 h-20 text-primary border p-2 rounded-full" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-1">
              Rate Limit Reached!
            </h3>
            <p className="text-base text-base-content">
              You've made too many requests too quickly. Please wait a few
              seconds.
            </p>
            <p className="text-sm text-base-content/70 mt-1">
              We recommend trying again shortly for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimited;
