import { CircularProgress } from "@mui/material";
import { AbsoluteBoxPosition } from "./styled/styledLayout";

const Loading = () => {
  return (
    <AbsoluteBoxPosition>
      <CircularProgress />
    </AbsoluteBoxPosition>
  );
};

export default Loading;
