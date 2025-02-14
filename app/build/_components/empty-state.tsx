export const EmptyState = () => {
  return (
    <div className="border border-dashed rounded-md">
      <div className="flex flex-col items-center justify-center h-[8rem]">
        <h3 className="text-base font-semibold text-center">
          No Inputs Added Yet!
        </h3>
        <p className="text-xs text-muted-foreground text-center">
          Start building your form by adding input fields.
        </p>
      </div>
    </div>
  );
};
