import { Skeleton } from "@material-ui/lab";
interface Props {
  width?: number | string;
  height?: number | string;
}
const ProductSkeleton = (props: Props) => {
  const { height, width } = props;
  return (
    <div style={{ marginLeft: 10 }}>
      <Skeleton
        variant="rect"
        style={{ width: width ? width : 160, height: height ?? 220 }}
        width={"100%"}
      />
      <Skeleton />
      <Skeleton width="60%" />
    </div>
  );
};
export default ProductSkeleton;
