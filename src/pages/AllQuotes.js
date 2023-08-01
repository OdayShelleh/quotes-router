import QuoteList from "../components/quotes/QuoteList";

export const DUMMY_QUOTES = [
  { id: "q1", author: "Oday", text: "Learning another language is fun!" },
  { id: "q2", author: "Od", text: "Learning another language is great!" },
];

const AllQuotes = (props) => {
  return <QuoteList quotes={DUMMY_QUOTES} />;
};

export default AllQuotes;
