import { Container, Icon } from "@mui/material";

export function Home() {
  return (
    <>
      <h2>Stolen Cycles: Uniting stolen bikes with their owners</h2>
      <Container sx={{ textAlign: "left" }}>
        <h2>The Problem</h2>
        <p>
          Most metropolitan areas have a serious problem with bikes thefts. In
          some cases these are inexpensive bikes, but often they are high end
          bikes worth $500 to $5000. It remains unclear where most of these
          bikes go, but some are sold online. Currently, a number of dedicated
          people check sites like OfferUp frequently and then try to match ads
          with thefts that have been reported. This can get unwieldy because
          multiple people are scanning the same ads and using ad hoc systems to
          keep notes.
        </p>
        <p>
          {" "}
          On the flip side, information about thefts may be scattered among
          Facebook groups, national organizations like BikeIndex, and police
          reports.
        </p>
        <h2>A Solution</h2>
        <p>
          Stolen Cycles provides a centralized platform where Ads and Thefts are
          listed, Matches are evaluated and Sellers are tracked.
        </p>
        <h3>
          <a href="./ads">Advertisements</a>
        </h3>
        <p>
          First, we import information from online ads that are posted on sites
          like Craigslist, OfferUp, and Facebook Marketplace. For Marketplace
          and OfferUp, we have direct connections that scrape data from the
          sites and feed them into WheelRights. For the other sites, data can be
          entered manually. Once the ads are in our system they are reviewed and
          catalogued.
        </p>
        <h3>
          <a href="./thefts">Thefts</a>
        </h3>
        <p>
          Second, we gather information about bikes that have been reported as
          stolen. The main sources are Facebook groups and BikeIndex. Theft
          reports from BikeIndex are scraped in an semi-automated fashion that
          is initiated from the Wheelright UI. Reports from BikeIndex.org the
          Twin Cities Stolen Bikes Facebook group are imported through a backend
          process because that group is private. Once thefts have been imported,
          they are codified manually. As with ads, the essential information is
          brand and color, with model being used to narrow the matching process
          further. For the most part, theft reports from BikeIndex are already
          codified during the import process.
        </p>
        <h3>
          <a href="./matches">Matches</a>
        </h3>
        <p>
          Next, the system tries to match ads with thefts. Stolen Cycles match
          on brand and color, and also uses the model if that has been entered.
          Users decide if matches are true matches. Although there are many
          false hits, the system remembers the decisions.
        </p>
        <h3>
          <a href="./sellers">Sellers</a>
        </h3>
        <p>
          We use the word "Seller" to refer to the person who sells a bike and
          the word "Alias" to refer to their profile on a platform like Facebook
          or OfferUp. A seller can have multiple aliases, either on a single
          platfor or across several. For some ads, we capture information about
          the seller. Those ads have a dark, active silhouette on the ad.
          Clicking on the silhouette opens a page on which you can see all the
          bikes the seller has listed and enter information about the seller.
        </p>
        <h3>
          <a href="./admin">Admin</a>
        </h3>
        <p>
          The Admin tab provides control over the list of brands and colors
          known to the system. It also provides a report of the known thefts,
          with totals by month. It has a button that allows you to purge ads
          that have been marked as Junk and are over 90 days old. This improves
          the performance and cost of the application.
        </p>
        <h2>Instructions</h2>
        <h3>Advertisements</h3>
        Clicking on the <a href="./ads">Ads</a> tab displays a list of
        advertisements that have been captured in the system. The ads are
        presented in reverse chronological order and it uses 'infinite' scroll
        to display more ads when you scroll to the bottom. By default, it will
        show new ads that have not yet been catalogued. The radio buttons at the
        top of the screen allow you to switch the list of ads that have been
        reviewed and marked as interesting and have a brand and color. When you
        are looking at reviewed ads, you can filter by brand.
        <br />
        Ads are scraped from OfferUp and Facebook Marketplace about every 3
        hours, but you can for an immediate scrape of either site using the
        buttons at the top. There is also a button that will attempt to remove
        some of the bikes that have been sold. One of the core tasks is
        cataloguing ads. The icons at the bottom of an ad allow you to mark it
        as
        <ul>
          <li>
            "Legit" <Icon style={{ color: "green" }}>thumb_up_icon</Icon> if you
            are sure it is not stolen.
          </li>
          <li>
            "Junk" <Icon style={{ color: "blue" }}>toys_icon</Icon> if it is not
            something we are interested in tracking, such as toddler trikes,
            bike parts, or clothing.
          </li>
          <li>
            "Sold" <Icon style={{ color: "blue" }}>shopping_cart_icon</Icon> if
            it has already been sold by the time you are looking at the ad.
          </li>
        </ul>
        Any ad that does not fall into one of these categories is something that
        might be a match to a reported theft. Enter the brand, color, and model;
        then click the green check mark{" "}
        <Icon style={{ color: "green" }}>check_icon</Icon>. The matching process
        requires a perfect match on brand and color. If the model is entered, it
        requires a match on the first word of model and any associated number.
        It is best to select the brand from the dropdown. If you encounter a new
        brand, enter it manually or use the admin tab to add it to the standard
        list. Color can be challenging. If a bike has several colors, use the
        color at the headbadge on the front of the steering tube. The Bianchi
        green/blue is always difficult. What is most important is that you are
        consistent between the colors if ads and the colors in theft reports.
        <br />
        If the system has captured information about the online profile of the
        seller, the silhouette at the bottom of the ad will be black and can be
        clicked. Clicking on it will open a new tab with details about the
        seller.
        <h3>Thefts</h3>
        Clicking on the <a href="./thefts">Thefts</a> tab displays the list of
        thefts that have captured by the system, in reverse chronological order.
        Compared with ads, thefts may require more manual editing, especially
        when they was imported from a Facebook group's posts. The brand, color
        and model should be entered or verified. If a reports is for several
        bikes, use the the Clone button to create two entries and specify the
        details separately in the two copies. You may also find two entries for
        the same stolen bike, from BikeIndex and from a Facebook. Mark the
        checkboxes on the two reports and then use the Merge button at the top
        of the list. If a listing is not really for a theft, such as a Facebook
        post that is a general announcement from the moderators, use the Delete
        (trash can) button.
        <h3>Sellers</h3>
        From an ad that has seller information, use the silhouette to the
        seller's details. The page provides a place for you to enter the
        seller's birthdate, trust-worthiness, notes, and a card for each online
        alias for the seller. At the bottom of the page will be thumbnails for
        all the ads that seller has listed. If you find another online profile
        for the seller, use the "Add" button and then enter or paste the URL for
        the seller's Facebook or OfferUp profile.
        <br />
        You can also click on the <a href="./sellers">Sellers</a> tab to display
        the list of all sellers that have captured by the system.
      </Container>
    </>
  );
}
