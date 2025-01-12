"use client";
import Heading from "./Heading";

interface EmptyStateProps {
   title?: string;
   subTitle?: string;
   showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
   title = "No exact matches.",
   subTitle = "Try changing different Category.",
}) => {
   return (
      <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
         <Heading center title={title} subtitle={subTitle} />
         
      </div>
   );
};

export default EmptyState;
