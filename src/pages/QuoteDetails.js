import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/useHttp";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { getSingleQuote } from "../lib/api";
import { useEffect } from "react";

const QuoteDetails = () => {
  const quoteId = useParams().quoteId;
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (status === "completed" && !loadedQuote.text) {
    return <div className="centered focused">No Quote Found</div>;
  }

  return (
    <>
      {loadedQuote ? (
        <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      ) : (
        <NoQuotesFound />
      )}

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments quoteId={quoteId} />
      </Route>
    </>
  );
};

export default QuoteDetails;
