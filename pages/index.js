import ListsHomes from "../components/ListsHomes";
import { URL, fetchApi } from "../utils/fetchApi";
import Property from "../components/Property";

export default function Home({ propertySale, propertyRent }) {
  console.log(propertySale, propertyRent);
  return (
    <main>
      <ListsHomes
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1=" Explore from Apartments, builder floors, villas"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        id="rent"
      />
      <div className="container grid grid-cols-3 gap-4" id="rent">
        {propertyRent.map((rent) => {
          return (
            <Property
              key={rent.id}
              {...rent}
              rentFrequency={rent.rentFrequency}
            />
          );
        })}
      </div>
      <ListsHomes
        purpose="BUY A HOME"
        title1=" Find, Buy & Own Your"
        title2="Dream Home"
        desc1=" Explore from Apartments, land, builder floors,"
        desc2=" villas and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        id="sale"
      />
      <div className="container grid grid-cols-3 gap-4" id="sale">
        {propertySale.map((sale) => {
          return <Property key={sale.id} {...sale} />;
        })}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const propertySale = await fetchApi(
    `${URL}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=9`
  );
  const propertyRent = await fetchApi(
    `${URL}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=9`
  );

  return {
    props: {
      propertySale: propertySale?.hits,
      propertyRent: propertyRent?.hits,
    },
  };
}
