import { Skeleton } from "@material-ui/lab";

const TextSkeleton = () => {
  return (
    <div style={{ paddingBottom: 10, paddingTop: 10 }}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation="wave" />
    </div>
  );
};
export default TextSkeleton;
