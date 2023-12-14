import Introduction from "@/components/Introduction";
import Address from "@/components/Address";
import Contributors from "@/components/Contributors";
import Footer from "@/components/Footer";
import MainPage from "@/components/MainPage";
import Members from "@/components/Members";

export default function Home() {
  return (
    <div>
      <MainPage />
      <Introduction />
      <Contributors />
      <Members/>
      <Address />
      <Footer />
    </div>
  );
}
