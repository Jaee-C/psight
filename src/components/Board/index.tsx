import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";
import Board from "@/components/Board/Board";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/data/query";

interface Props {
  autoScrollerOptions?: PartialAutoScrollerOptions;
  useClone?: boolean;
  containerHeight?: string;
  isCombineEnabled?: boolean;
  withScrollableColumns?: boolean;
}

export default function Index(props: Props): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Board
        isCombineEnabled={props.isCombineEnabled}
        ignoreContainerClipping={Boolean(props.containerHeight)}
        withScrollableColumns={props.withScrollableColumns}
        useClone={props.useClone}
      />
    </QueryClientProvider>
  );
}
