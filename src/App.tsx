import SearchWithResults from "./components/organisms/SearchWithResults";

export default function App() {
  return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#101720]">
        <SearchWithResults
          className="flex flex-col items-center py-16"
        />
      </div>
  );
}

