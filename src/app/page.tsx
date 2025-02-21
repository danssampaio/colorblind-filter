import Posts from "@/app/components/posts";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

const Page = async () => {
  return (
    <>
      <Header />
      <Posts />
      <Footer />
    </>
  );
};

export default Page;
