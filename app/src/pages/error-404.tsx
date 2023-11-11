import { Link } from "common/ui/link";
import { PageWrapper } from "common/ui/page_wrapper";

export function Error404Page() {
  return (
    <PageWrapper>
      <h1>404 Page Not Found</h1>
      <Link to="/">Back to home</Link>
    </PageWrapper>
  );
}
