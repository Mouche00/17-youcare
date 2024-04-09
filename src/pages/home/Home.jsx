import React, { useState, useEffect } from "react";
import { getListings } from "@data/listing/listingData";
import Hero from "@/components/home/Hero";
import Input from "@components/ui/Input";
import Card from "@components/ui/card/Card";
import CardWrapper from "@components/ui/card/CardWrapper";
import Pagination from "@components/ui/Pagination";
import Spinner from "@components/ui/spinner/Spinner";
import Sticker from "@components/ui/Sticker";
import ListingsWrapper from "../../components/home/ListingsWrapper";
import Seperator from "../../components/ui/Seperator";

const Home = () => {
    const [listings, setListings] = useState([]);
    const [query, setQuery] = useState("");
    const [pages, sePages] = useState({});
    const [currentPage, setCurrentPage] = useState("1");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 700);
    };

    const fetchListingsList = (query, page) => {
        const fetch = async () => {
            const listingData = await getListings(query, page);
            setListings(listingData.data);
            sePages(listingData.links);
        };
        fetch();
        load();

        fetch().catch(() => {
            load();
            setError("An error occured while fetching the data");
        });
    };

    useEffect(() => {
        fetchListingsList();
        console.log(listings);
    }, []);
    console.log(listings);

    const handleQueryChange = (e) => {
        const value = e.target.value;
        setCurrentPage("1");
        setQuery(value);
        fetchListingsList(value);
    };

    const handleCurrentPageChange = (id) => {
        setCurrentPage(id);
        fetchListingsList(query, id);
    };

    return (
        <>
            <Hero classes>
                <Input
                    classInput="border-2 border-black h-10 w-full rounded shadow-lg p-4"
                    divStyle={{
                        width: "80%",
                    }}
                    handleChange={handleQueryChange}
                />
            </Hero>

            <Seperator />

            <ListingsWrapper classes="bg-secondary">
                <Sticker classes="text-center">Listings</Sticker>

                <div className="py-10">
                    {loading ? (
                        <Spinner />
                    ) : error ? (

                        <p className="text-center">{error}</p>
                    ) : listings.length > 0 ? (
                        <>
                            <CardWrapper>
                                {listings.map((listing) => (
                                    <Card key={listing.id} listing={listing} />
                                ))}
                            </CardWrapper>

                            <Pagination
                                pages={pages}
                                page={currentPage}
                                onPageChange={handleCurrentPageChange}
                            />
                        </>
                    ) : (
                        // show 'data not found'
                        <p className="text-center mt-16">Unable to find data</p>
                    )}
                </div>

                {/* <Sticker /> */}
            </ListingsWrapper>
        </>
    );
};

export default Home;
