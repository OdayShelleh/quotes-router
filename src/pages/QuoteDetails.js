import { Route, useParams } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import { DUMMY_QUOTES } from "./AllQuotes";

const QuoteDetails = (props) => {
  const params = useParams();
  const quote = DUMMY_QUOTES.find((qu) => qu.id === params.quoteId);

  return (
    <>
      {quote ? (
        <HighlightedQuote author={quote.author} text={quote.text} />
      ) : (
        <NoQuotesFound />
      )}

      <Route path="/quotes/:quoteId/comments">
        <Comments />
      </Route>
    </>
  );
};

export default QuoteDetails;
