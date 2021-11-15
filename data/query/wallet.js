import { gql } from "@apollo/client";
import getClient from "../client";

const connectWalletGql = gql`
  mutation userConnect(
    $provider: String!
    $provider_network: String!
    $provider_account_id: String!
    $type: String!
  ) {
    userConnect(
      provider: $provider
      provider_network: $provider_network
      provider_account_id: $provider_account_id
      type: $type
    ) {
      status
    }
  }
`;

const disconnectWalletGql = gql`
  mutation userDisconnect(
    $id: Int!
  ) {
    userDisconnect(
      id: $id
    ) {
      status
    }
  }
`;

export async function connectWallet({
  provider,
  provider_network,
  provider_account_id,
  type,
}) {
  const client = getClient();
  const res = await client.mutate({
    mutation: connectWalletGql,
    variables: {
      provider: provider,
      provider_network: provider_network,
      provider_account_id: provider_account_id,
      type: type,
    },
  });
  return res;
}

export async function disconnectWallet(id) {
  const client = getClient();
  const res = await client.mutate({
    mutation: disconnectWalletGql,
    variables: {
      id : id
    },
  });
  return res;
}
