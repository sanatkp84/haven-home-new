import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import Container from "./components/container";
import ListingCard from "./components/listings/ListingCard";


interface HomeProps{
  searchParams: IListingParams
}


//Home is a server component
const Home = async ( {searchParams} : HomeProps) => {
  const currentUser = await getCurrentUser();
  const listings = await getListings( searchParams );
  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className="
              pt-20
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-6
            ">

          {listings.map((listing) => {
            return(
              <ListingCard
                currentUser = {currentUser}
                key = {listing.id}
                data = {listing}
              />
            )
          })}

        </div>
      </Container>
    </ClientOnly>
  )
}
export default Home;
