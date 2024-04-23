import React, { useState, useEffect} from 'react';
import { hubspot, Text, ButtonRow, Button, Heading, Divider } from '@hubspot/ui-extensions';
import { CrmDataHighlight } from '@hubspot/ui-extensions/crm';

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, actions }) => <Extension context={context} openIframeModal={actions.openIframeModal} fetchProperties={actions.fetchCrmObjectProperties} />);

const Extension = ({ context, openIframeModal, fetchProperties }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
      fetchProperties(["firstname", "lastname", "email"])
        .then(properties => {
          setFirstName(properties.firstname);
          setLastName(properties.lastname);
          setEmail(properties.email);
      });
  }, [fetchProperties]);

  return (
    <>
      {/* First Section */}
      <Text format={{ fontWeight: 'bold' } }>Contact Action Center</Text>
      <Text> </Text>
      <ButtonRow>
        <Button
          onClick={() => {
            openIframeModal({
              uri: `https://aptitude8.tech/hs-rep-extension-demo-page?firstname=${firstName}&lastname=${lastName}&email=${email}&headline=PIN%20Reset%20Success&body=${firstName}%27s%20PIN%20has%20been%20reset%20successfully.%20An%20email%20has%20been%20sent%20to%20${email}%20with%20further%20instructions.`,
              height: 800,
              width: 1000
            });
            console.log(firstName, lastName)
            }}
          type="button"
          >
          Authentication/PIN
        </Button>
        <Button
          onClick={() => {
            openIframeModal({
              uri: `https://aptitude8.tech/hs-rep-extension-demo-page?firstname=${firstName}&lastname=${lastName}&email=${email}&headline=Account%20Creation%20Success&body=${firstName}'s%20new%20account%20has%20been%20successfully%20created%20with%20the%20email%20address%20${email}.`,
              height: 800,
              width: 1000
            });
            console.log(firstName, lastName)
            }}
          type="button"
          >
          Initiate New Account
        </Button>
        <Button
          onClick={() => {
            openIframeModal({
              uri: `https://aptitude8.tech/hs-rep-extension-demo-page?firstname=${firstName}&lastname=${lastName}&email=${email}&headline=Sync%20Success&body=${firstName}'s%20account%20data%20has%20been%20successfully%20synced%20with%20HubSpot.`,
              height: 800,
              width: 1000
            });
            console.log(firstName, lastName)
            }}
          type="button"
          >
          Update Account Information
        </Button>
      </ButtonRow>
      <Divider distance="medium"></Divider>
      {/* Second Section */}
      <Text format={{ fontWeight: 'bold' } }>Send Offer</Text>
      <Text variant="microcopy">Remind about paperless billing</Text>
      <Text> </Text>
      <ButtonRow>
        <Button
          onClick={() => {
            setSuccessMessage("Push notification sent!");
            setTimeout(() => {
              setSuccessMessage("");
            }, 1500);
            }}
          type="button"
          >
          Send Paperless Billing Discount Offer
        </Button>
      </ButtonRow>
      <Text> </Text>
      <Text>{successMessage}</Text>
      <Divider distance="medium"></Divider>
      {/* Third Section */}
      <Text format={{ fontWeight: 'bold' } }>Best Promotion Available</Text>
      <Text variant="microcopy">FICO Score and Dark Web Monitoring</Text>
      <ButtonRow>
        <Button
          onClick={() => {
            openIframeModal({
              uri: "https://aptitude8.tech/hs-rep-extension-demo-page?offerings",
              height: 800,
              width: 1000
            });
            console.log(firstName, lastName)
            }}
          type="button"
          >
          View All Available Promotions
        </Button>
      </ButtonRow>
      <Divider distance="medium"></Divider>
      <CrmDataHighlight
        properties={["createdate", "lifecyclestage", "notes_last_updated", "notes_last_contacted"]}
      />
      <Divider distance="medium"></Divider>
      <CrmDataHighlight
        properties={["hs_analytics_average_page_views","hs_analytics_last_visit_timestamp", "hs_analytics_last_url", "hs_analytics_num_visits"]}
      />
      <Divider distance="medium"></Divider>
      <Text variant="microcopy">Developed by Aptitude8</Text>
    </>
  );
};
