import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Calculator from "@/components/Calculator";
import CountryTable from "@/components/CountryTable";
import CodeExample from "@/components/CodeExample";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Calculator />
        <CountryTable />
        <CodeExample />
      </main>
      <Footer />
    </>
  );
}
