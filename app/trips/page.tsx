

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

// it will be a server component

const TripsPage = async () => {

    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorised Access"
                    subtitle="Please Login"
                />
            </ClientOnly>
        )
    }


    const reservations = await getReservations({
        userId: currentUser.id,
    });
    if(reservations.length == 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Looks like you have not reserved any trips"
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;