export const EmptyState = () => {
  return (
    <div className="border border-dashed rounded-md w-full h-[8rem] flex flex-col items-center justify-center">
      <h3 className="text-base font-semibold">No Inputs Added Yet!</h3>
      <p className="text-xs text-muted-foreground">
        Start building your form by adding input fields.
      </p>
    </div>
  );
};
