## skio_documentation.md

## Skio Documentation
- documentation: https://code.skio.com/
- Skio API Key==68b75f88-c5ff-422b-ba85-f0ce2f7f8847
- Skio siteId: 6c804ee7-4420-47ae-a75c-048e30a13802


Skio API Reference
Empower your store with an open GraphQL API that can easily integrate subscription data into your tech stack.

Authorization
Go to your dashboard and click the API button on the left navigation bar. Generate an API token after setting a name and use this token in the request header "authorization" (case sensitive).

headers: {
  "Content-Type": "application/graphql"
  "authorization": "API <token>"
}
Data model
Skio's data model mirrors the Shopify GraphQL objects.

Skio	Shopify
Subscription	SubscriptionContract
SubscriptionLine	SubscriptionLine
Order	Order
OrderLineItem	LineItem
StorefrontUser	Customer
The platformId field in the Skio API represents the GID which can be used to query Shopify. For example: the platformId of a Subscription would be gid://shopify/SubscriptionContract/12346616394.

Query examples
The GraphQL schema for queries is documented here. Here is an example of using the Skio API to look up subscriptions for a certain user, ordered by creation time.

query getSubscriptions {
  Subscriptions(
    where: {
      StorefrontUser: {email: {_eq: "test@test.com"}}
    }, 
    order_by: {createdAt: desc}
  ) {
    # 09f3526e-1db3-aaaa-1234-871b3444523c
    id
    # gid://shopify/SubscriptionContract/12131
    platformId
    # 2024-01-01T00:00:00.123456+00:00
    createdAt
    StorefrontUser {
      # test@test.com
      email
      # gid://shopify/Customer/1213
      platformId
    }
    # We need to filter out lines which are removed.
    SubscriptionLines(where: {removedAt: {_is_null: true}}) {
      # 12.31
      priceWithoutDiscount
      ProductVariant {
        # Large
        title
        Product {
          # Tuxedo
          title
        }
      }
    }
  }
}
Analytics
If you're trying to ingest all of your subscription data into a data warehouse, our BigQuery integration offers a turn-key solution to do a bulk transfer of all subscription data accessible through this API.

This integration also works with most popular data warehouses like Snowflake, Databricks, Redshift.

Contact
Skio Engineering

help@skio.com

http://www.skio.com/support

Terms of Service
https://skio.com/terms/

API Endpoints
https://graphql.skio.com/v1/graphql
Queries
AddressByPk
Description
fetch data from the table: "Address" using primary key columns

Response
Returns an Address

Arguments
Name	Description
id - uuid!	
Example
Query
query AddressByPk($id: uuid!) {
  AddressByPk(id: $id) {
    PaymentMethod {
      ...PaymentMethodFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    Subscriptions {
      ...SubscriptionFragment
    }
    address1
    address2
    city
    company
    country
    createdAt
    doorCode
    firstName
    id
    lastName
    phoneNumber
    platformId
    province
    storefrontUserId
    updatedAt
    zip
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "AddressByPk": {
      "PaymentMethod": PaymentMethod,
      "StorefrontUser": StorefrontUser,
      "Subscriptions": [Subscription],
      "address1": "abc123",
      "address2": "abc123",
      "city": "abc123",
      "company": "abc123",
      "country": "abc123",
      "createdAt": timestamptz,
      "doorCode": "xyz789",
      "firstName": "xyz789",
      "id": uuid,
      "lastName": "abc123",
      "phoneNumber": "xyz789",
      "platformId": "xyz789",
      "province": "abc123",
      "storefrontUserId": uuid,
      "updatedAt": timestamptz,
      "zip": "abc123"
    }
  }
}
Queries
Addresses
Description
fetch data from the table: "Address"

Response
Returns [Address!]!

Arguments
Name	Description
distinct_on - [Address_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [Address_order_by!]	sort the rows by one or more columns
where - Address_bool_exp	filter the rows returned
Example
Query
query Addresses(
  $distinct_on: [Address_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [Address_order_by!],
  $where: Address_bool_exp
) {
  Addresses(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    PaymentMethod {
      ...PaymentMethodFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    Subscriptions {
      ...SubscriptionFragment
    }
    address1
    address2
    city
    company
    country
    createdAt
    doorCode
    firstName
    id
    lastName
    phoneNumber
    platformId
    province
    storefrontUserId
    updatedAt
    zip
  }
}
Variables
{
  "distinct_on": ["address1"],
  "limit": 987,
  "offset": 987,
  "order_by": [Address_order_by],
  "where": Address_bool_exp
}
Response
{
  "data": {
    "Addresses": [
      {
        "PaymentMethod": PaymentMethod,
        "StorefrontUser": StorefrontUser,
        "Subscriptions": [Subscription],
        "address1": "xyz789",
        "address2": "abc123",
        "city": "abc123",
        "company": "abc123",
        "country": "abc123",
        "createdAt": timestamptz,
        "doorCode": "abc123",
        "firstName": "xyz789",
        "id": uuid,
        "lastName": "abc123",
        "phoneNumber": "xyz789",
        "platformId": "xyz789",
        "province": "xyz789",
        "storefrontUserId": uuid,
        "updatedAt": timestamptz,
        "zip": "xyz789"
      }
    ]
  }
}
Queries
DiscountByPk
Description
fetch data from the table: "Discount" using primary key columns

Response
Returns a Discount

Arguments
Name	Description
id - uuid!	
Example
Query
query DiscountByPk($id: uuid!) {
  DiscountByPk(id: $id) {
    CancelFlowSession {
      ...CancelFlowSessionFragment
    }
    Group {
      ...GroupFragment
    }
    GroupPlan {
      ...GroupPlanFragment
    }
    OrderLineItem {
      ...OrderLineItemFragment
    }
    ShippingLine {
      ...ShippingLineFragment
    }
    Subscription {
      ...SubscriptionFragment
    }
    SubscriptionLine {
      ...SubscriptionLineFragment
    }
    appliesOnEachItem
    cancelFlowSessionId
    createdAt
    fixedValue
    groupId
    groupPlanId
    id
    maxTimesUsed
    orderLineItemId
    percentage
    platformId
    redeemCode
    shippingLineId
    subscriptionId
    subscriptionLineId
    timesUsed
    title
    type
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "DiscountByPk": {
      "CancelFlowSession": CancelFlowSession,
      "Group": Group,
      "GroupPlan": GroupPlan,
      "OrderLineItem": OrderLineItem,
      "ShippingLine": ShippingLine,
      "Subscription": Subscription,
      "SubscriptionLine": SubscriptionLine,
      "appliesOnEachItem": true,
      "cancelFlowSessionId": uuid,
      "createdAt": timestamptz,
      "fixedValue": numeric,
      "groupId": uuid,
      "groupPlanId": uuid,
      "id": uuid,
      "maxTimesUsed": 987,
      "orderLineItemId": uuid,
      "percentage": numeric,
      "platformId": "abc123",
      "redeemCode": "xyz789",
      "shippingLineId": uuid,
      "subscriptionId": uuid,
      "subscriptionLineId": uuid,
      "timesUsed": 987,
      "title": "abc123",
      "type": "xyz789",
      "updatedAt": timestamptz
    }
  }
}
Queries
OrderByPk
Description
fetch data from the table: "Order" using primary key columns

Response
Returns an Order

Arguments
Name	Description
id - uuid!	
Example
Query
query OrderByPk($id: uuid!) {
  OrderByPk(id: $id) {
    OrderLineItems {
      ...OrderLineItemFragment
    }
    PrepaidSubscription {
      ...SubscriptionFragment
    }
    ShippingLines {
      ...ShippingLineFragment
    }
    Site {
      ...SiteFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    appId
    cancelledAt
    clientIp
    createdAt
    deletedAt
    deliveredAt
    id
    note
    platformId
    platformNumber
    processedAt
    siteId
    storefrontUserId
    totalPrice
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "OrderByPk": {
      "OrderLineItems": [OrderLineItem],
      "PrepaidSubscription": Subscription,
      "ShippingLines": [ShippingLine],
      "Site": Site,
      "StorefrontUser": StorefrontUser,
      "appId": "xyz789",
      "cancelledAt": timestamptz,
      "clientIp": "xyz789",
      "createdAt": timestamptz,
      "deletedAt": timestamptz,
      "deliveredAt": timestamptz,
      "id": uuid,
      "note": "xyz789",
      "platformId": "abc123",
      "platformNumber": "abc123",
      "processedAt": timestamptz,
      "siteId": uuid,
      "storefrontUserId": uuid,
      "totalPrice": 987.65,
      "updatedAt": timestamp
    }
  }
}
Queries
OrderLineItems
Description
An array relationship

Response
Returns [OrderLineItem!]!

Arguments
Name	Description
distinct_on - [OrderLineItem_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [OrderLineItem_order_by!]	sort the rows by one or more columns
where - OrderLineItem_bool_exp	filter the rows returned
Example
Query
query OrderLineItems(
  $distinct_on: [OrderLineItem_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [OrderLineItem_order_by!],
  $where: OrderLineItem_bool_exp
) {
  OrderLineItems(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    Discounts {
      ...DiscountFragment
    }
    GroupIfInitialOrder {
      ...GroupFragment
    }
    Order {
      ...OrderFragment
    }
    ProductVariant {
      ...ProductVariantFragment
    }
    SubscriptionLine {
      ...SubscriptionLineFragment
    }
    TaxLines {
      ...TaxLineFragment
    }
    attributionGroupId
    createdAt
    customAttributes
    groupId
    id
    orderId
    platformId
    priceWithoutDiscount
    productVariantId
    quantity
    subscriptionLineId
    updatedAt
  }
}
Variables
{
  "distinct_on": ["attributionGroupId"],
  "limit": 123,
  "offset": 123,
  "order_by": [OrderLineItem_order_by],
  "where": OrderLineItem_bool_exp
}
Response
{
  "data": {
    "OrderLineItems": [
      {
        "Discounts": [Discount],
        "GroupIfInitialOrder": Group,
        "Order": Order,
        "ProductVariant": ProductVariant,
        "SubscriptionLine": SubscriptionLine,
        "TaxLines": [TaxLine],
        "attributionGroupId": uuid,
        "createdAt": timestamptz,
        "customAttributes": jsonb,
        "groupId": uuid,
        "id": uuid,
        "orderId": uuid,
        "platformId": "abc123",
        "priceWithoutDiscount": numeric,
        "productVariantId": uuid,
        "quantity": 123,
        "subscriptionLineId": uuid,
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
Orders
Description
An array relationship

Response
Returns [Order!]!

Arguments
Name	Description
distinct_on - [Order_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [Order_order_by!]	sort the rows by one or more columns
where - Order_bool_exp	filter the rows returned
Example
Query
query Orders(
  $distinct_on: [Order_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [Order_order_by!],
  $where: Order_bool_exp
) {
  Orders(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    OrderLineItems {
      ...OrderLineItemFragment
    }
    PrepaidSubscription {
      ...SubscriptionFragment
    }
    ShippingLines {
      ...ShippingLineFragment
    }
    Site {
      ...SiteFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    appId
    cancelledAt
    clientIp
    createdAt
    deletedAt
    deliveredAt
    id
    note
    platformId
    platformNumber
    processedAt
    siteId
    storefrontUserId
    totalPrice
    updatedAt
  }
}
Variables
{
  "distinct_on": ["appId"],
  "limit": 987,
  "offset": 987,
  "order_by": [Order_order_by],
  "where": Order_bool_exp
}
Response
{
  "data": {
    "Orders": [
      {
        "OrderLineItems": [OrderLineItem],
        "PrepaidSubscription": Subscription,
        "ShippingLines": [ShippingLine],
        "Site": Site,
        "StorefrontUser": StorefrontUser,
        "appId": "abc123",
        "cancelledAt": timestamptz,
        "clientIp": "abc123",
        "createdAt": timestamptz,
        "deletedAt": timestamptz,
        "deliveredAt": timestamptz,
        "id": uuid,
        "note": "abc123",
        "platformId": "xyz789",
        "platformNumber": "abc123",
        "processedAt": timestamptz,
        "siteId": uuid,
        "storefrontUserId": uuid,
        "totalPrice": 123.45,
        "updatedAt": timestamp
      }
    ]
  }
}
Queries
Policies
Description
fetch data from the table: "Policy"

Response
Returns [Policy!]!

Arguments
Name	Description
distinct_on - [Policy_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [Policy_order_by!]	sort the rows by one or more columns
where - Policy_bool_exp	filter the rows returned
Example
Query
query Policies(
  $distinct_on: [Policy_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [Policy_order_by!],
  $where: Policy_bool_exp
) {
  Policies(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    Anchors {
      ...AnchorFragment
    }
    SellingPlansByBillingPolicy {
      ...SellingPlanFragment
    }
    SellingPlansByDeliveryPolicy {
      ...SellingPlanFragment
    }
    SellingPlansByPrepaidDeliveryPolicy {
      ...SellingPlanFragment
    }
    SubscriptionsByBillingPolicy {
      ...SubscriptionFragment
    }
    SubscriptionsByDeliveryPolicy {
      ...SubscriptionFragment
    }
    SubscriptionsByPrepaidDeliveryPolicy {
      ...SubscriptionFragment
    }
    createdAt
    id
    interval
    intervalCount
    isMaxCycleV2
    maxCycles
    minCycles
    updatedAt
  }
}
Variables
{
  "distinct_on": ["createdAt"],
  "limit": 123,
  "offset": 123,
  "order_by": [Policy_order_by],
  "where": Policy_bool_exp
}
Response
{
  "data": {
    "Policies": [
      {
        "Anchors": [Anchor],
        "SellingPlansByBillingPolicy": [SellingPlan],
        "SellingPlansByDeliveryPolicy": [SellingPlan],
        "SellingPlansByPrepaidDeliveryPolicy": [
          SellingPlan
        ],
        "SubscriptionsByBillingPolicy": [Subscription],
        "SubscriptionsByDeliveryPolicy": [Subscription],
        "SubscriptionsByPrepaidDeliveryPolicy": [
          Subscription
        ],
        "createdAt": timestamptz,
        "id": uuid,
        "interval": "abc123",
        "intervalCount": 123,
        "isMaxCycleV2": true,
        "maxCycles": 123,
        "minCycles": 123,
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
PolicyByPk
Description
fetch data from the table: "Policy" using primary key columns

Response
Returns a Policy

Arguments
Name	Description
id - uuid!	
Example
Query
query PolicyByPk($id: uuid!) {
  PolicyByPk(id: $id) {
    Anchors {
      ...AnchorFragment
    }
    SellingPlansByBillingPolicy {
      ...SellingPlanFragment
    }
    SellingPlansByDeliveryPolicy {
      ...SellingPlanFragment
    }
    SellingPlansByPrepaidDeliveryPolicy {
      ...SellingPlanFragment
    }
    SubscriptionsByBillingPolicy {
      ...SubscriptionFragment
    }
    SubscriptionsByDeliveryPolicy {
      ...SubscriptionFragment
    }
    SubscriptionsByPrepaidDeliveryPolicy {
      ...SubscriptionFragment
    }
    createdAt
    id
    interval
    intervalCount
    isMaxCycleV2
    maxCycles
    minCycles
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "PolicyByPk": {
      "Anchors": [Anchor],
      "SellingPlansByBillingPolicy": [SellingPlan],
      "SellingPlansByDeliveryPolicy": [SellingPlan],
      "SellingPlansByPrepaidDeliveryPolicy": [
        SellingPlan
      ],
      "SubscriptionsByBillingPolicy": [Subscription],
      "SubscriptionsByDeliveryPolicy": [Subscription],
      "SubscriptionsByPrepaidDeliveryPolicy": [
        Subscription
      ],
      "createdAt": timestamptz,
      "id": uuid,
      "interval": "abc123",
      "intervalCount": 123,
      "isMaxCycleV2": true,
      "maxCycles": 123,
      "minCycles": 123,
      "updatedAt": timestamptz
    }
  }
}
Queries
PricingPolicies
Description
An array relationship

Response
Returns [PricingPolicy!]!

Arguments
Name	Description
distinct_on - [PricingPolicy_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [PricingPolicy_order_by!]	sort the rows by one or more columns
where - PricingPolicy_bool_exp	filter the rows returned
Example
Query
query PricingPolicies(
  $distinct_on: [PricingPolicy_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [PricingPolicy_order_by!],
  $where: PricingPolicy_bool_exp
) {
  PricingPolicies(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    SellingPlan {
      ...SellingPlanFragment
    }
    afterCycle
    createdAt
    fixedPrice
    id
    percentageOff
    sellingPlanId
    sellingPlanPricingPolicyAdjustmentType
    updatedAt
  }
}
Variables
{
  "distinct_on": ["afterCycle"],
  "limit": 123,
  "offset": 123,
  "order_by": [PricingPolicy_order_by],
  "where": PricingPolicy_bool_exp
}
Response
{
  "data": {
    "PricingPolicies": [
      {
        "SellingPlan": SellingPlan,
        "afterCycle": 987,
        "createdAt": timestamptz,
        "fixedPrice": numeric,
        "id": uuid,
        "percentageOff": numeric,
        "sellingPlanId": uuid,
        "sellingPlanPricingPolicyAdjustmentType": "xyz789",
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
PricingPolicyByPk
Description
fetch data from the table: "PricingPolicy" using primary key columns

Response
Returns a PricingPolicy

Arguments
Name	Description
id - uuid!	
Example
Query
query PricingPolicyByPk($id: uuid!) {
  PricingPolicyByPk(id: $id) {
    SellingPlan {
      ...SellingPlanFragment
    }
    afterCycle
    createdAt
    fixedPrice
    id
    percentageOff
    sellingPlanId
    sellingPlanPricingPolicyAdjustmentType
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "PricingPolicyByPk": {
      "SellingPlan": SellingPlan,
      "afterCycle": 123,
      "createdAt": timestamptz,
      "fixedPrice": numeric,
      "id": uuid,
      "percentageOff": numeric,
      "sellingPlanId": uuid,
      "sellingPlanPricingPolicyAdjustmentType": "xyz789",
      "updatedAt": timestamptz
    }
  }
}
Queries
ProductByPk
Description
fetch data from the table: "Product" using primary key columns

Response
Returns a Product

Arguments
Name	Description
id - uuid!	
Example
Query
query ProductByPk($id: uuid!) {
  ProductByPk(id: $id) {
    DynamicBox {
      ...DynamicBoxFragment
    }
    ProductVariants {
      ...ProductVariantFragment
    }
    Site {
      ...SiteFragment
    }
    canUpsell
    createdAt
    deletedAt
    description
    hideOn1TimeUpsells
    id
    imageSrc
    images
    limitOneTimeUpsellQuantity
    metafields
    oneTimeUpsellPercentageOff
    platformId
    shopifyTags
    siteId
    slug
    smsOrder
    status
    title
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "ProductByPk": {
      "DynamicBox": DynamicBox,
      "ProductVariants": [ProductVariant],
      "Site": Site,
      "canUpsell": false,
      "createdAt": timestamptz,
      "deletedAt": timestamptz,
      "description": "xyz789",
      "hideOn1TimeUpsells": false,
      "id": uuid,
      "imageSrc": "xyz789",
      "images": jsonb,
      "limitOneTimeUpsellQuantity": true,
      "metafields": jsonb,
      "oneTimeUpsellPercentageOff": numeric,
      "platformId": "abc123",
      "shopifyTags": jsonb,
      "siteId": uuid,
      "slug": "abc123",
      "smsOrder": 987,
      "status": "xyz789",
      "title": "xyz789",
      "updatedAt": timestamptz
    }
  }
}
Queries
ProductVariantByPk
Description
fetch data from the table: "ProductVariant" using primary key columns

Response
Returns a ProductVariant

Arguments
Name	Description
id - uuid!	
Example
Query
query ProductVariantByPk($id: uuid!) {
  ProductVariantByPk(id: $id) {
    DynamicBox_SelectableProductVariants {
      ...DynamicBox_SelectableProductVariantFragment
    }
    OrderLineItems {
      ...OrderLineItemFragment
    }
    Product {
      ...ProductFragment
    }
    SellingPlanGroupResources {
      ...SellingPlanGroupResourceFragment
    }
    SubscriptionLines {
      ...SubscriptionLineFragment
    }
    compareAtPrice
    createdAt
    deletedAt
    id
    image
    marketPrices
    outOfStockAt
    platformId
    price
    productId
    sku
    title
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "ProductVariantByPk": {
      "DynamicBox_SelectableProductVariants": [
        DynamicBox_SelectableProductVariant
      ],
      "OrderLineItems": [OrderLineItem],
      "Product": Product,
      "SellingPlanGroupResources": [
        SellingPlanGroupResource
      ],
      "SubscriptionLines": [SubscriptionLine],
      "compareAtPrice": numeric,
      "createdAt": timestamptz,
      "deletedAt": timestamptz,
      "id": uuid,
      "image": "abc123",
      "marketPrices": jsonb,
      "outOfStockAt": timestamptz,
      "platformId": "abc123",
      "price": numeric,
      "productId": uuid,
      "sku": "xyz789",
      "title": "abc123",
      "updatedAt": timestamptz
    }
  }
}
Queries
ProductVariants
Description
An array relationship

Response
Returns [ProductVariant!]!

Arguments
Name	Description
distinct_on - [ProductVariant_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [ProductVariant_order_by!]	sort the rows by one or more columns
where - ProductVariant_bool_exp	filter the rows returned
Example
Query
query ProductVariants(
  $distinct_on: [ProductVariant_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [ProductVariant_order_by!],
  $where: ProductVariant_bool_exp
) {
  ProductVariants(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    DynamicBox_SelectableProductVariants {
      ...DynamicBox_SelectableProductVariantFragment
    }
    OrderLineItems {
      ...OrderLineItemFragment
    }
    Product {
      ...ProductFragment
    }
    SellingPlanGroupResources {
      ...SellingPlanGroupResourceFragment
    }
    SubscriptionLines {
      ...SubscriptionLineFragment
    }
    compareAtPrice
    createdAt
    deletedAt
    id
    image
    marketPrices
    outOfStockAt
    platformId
    price
    productId
    sku
    title
    updatedAt
  }
}
Variables
{
  "distinct_on": ["compareAtPrice"],
  "limit": 123,
  "offset": 987,
  "order_by": [ProductVariant_order_by],
  "where": ProductVariant_bool_exp
}
Response
{
  "data": {
    "ProductVariants": [
      {
        "DynamicBox_SelectableProductVariants": [
          DynamicBox_SelectableProductVariant
        ],
        "OrderLineItems": [OrderLineItem],
        "Product": Product,
        "SellingPlanGroupResources": [
          SellingPlanGroupResource
        ],
        "SubscriptionLines": [SubscriptionLine],
        "compareAtPrice": numeric,
        "createdAt": timestamptz,
        "deletedAt": timestamptz,
        "id": uuid,
        "image": "xyz789",
        "marketPrices": jsonb,
        "outOfStockAt": timestamptz,
        "platformId": "xyz789",
        "price": numeric,
        "productId": uuid,
        "sku": "xyz789",
        "title": "xyz789",
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
Products
Description
An array relationship

Response
Returns [Product!]!

Arguments
Name	Description
distinct_on - [Product_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [Product_order_by!]	sort the rows by one or more columns
where - Product_bool_exp	filter the rows returned
Example
Query
query Products(
  $distinct_on: [Product_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [Product_order_by!],
  $where: Product_bool_exp
) {
  Products(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    DynamicBox {
      ...DynamicBoxFragment
    }
    ProductVariants {
      ...ProductVariantFragment
    }
    Site {
      ...SiteFragment
    }
    canUpsell
    createdAt
    deletedAt
    description
    hideOn1TimeUpsells
    id
    imageSrc
    images
    limitOneTimeUpsellQuantity
    metafields
    oneTimeUpsellPercentageOff
    platformId
    shopifyTags
    siteId
    slug
    smsOrder
    status
    title
    updatedAt
  }
}
Variables
{
  "distinct_on": ["canUpsell"],
  "limit": 987,
  "offset": 123,
  "order_by": [Product_order_by],
  "where": Product_bool_exp
}
Response
{
  "data": {
    "Products": [
      {
        "DynamicBox": DynamicBox,
        "ProductVariants": [ProductVariant],
        "Site": Site,
        "canUpsell": false,
        "createdAt": timestamptz,
        "deletedAt": timestamptz,
        "description": "xyz789",
        "hideOn1TimeUpsells": true,
        "id": uuid,
        "imageSrc": "xyz789",
        "images": jsonb,
        "limitOneTimeUpsellQuantity": true,
        "metafields": jsonb,
        "oneTimeUpsellPercentageOff": numeric,
        "platformId": "xyz789",
        "shopifyTags": jsonb,
        "siteId": uuid,
        "slug": "abc123",
        "smsOrder": 987,
        "status": "abc123",
        "title": "xyz789",
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
SiteByPk
Description
fetch data from the table: "Site" using primary key columns

Response
Returns a Site

Arguments
Name	Description
id - uuid!	
Example
Query
query SiteByPk($id: uuid!) {
  SiteByPk(id: $id) {
    Holidays {
      ...HolidayFragment
    }
    Notifications {
      ...NotificationFragment
    }
    Products {
      ...ProductFragment
    }
    SkioSmsMessagingHistory {
      ...SkioSmsMessagingHistoryFragment
    }
    StorefrontUsers {
      ...StorefrontUserFragment
    }
    Theme {
      ...ThemeFragment
    }
    Theme2 {
      ...Theme2Fragment
    }
    currencyCode
    ianaTimezone
    id
    qaAuthSettings
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "SiteByPk": {
      "Holidays": [Holiday],
      "Notifications": [Notification],
      "Products": [Product],
      "SkioSmsMessagingHistory": [
        SkioSmsMessagingHistory
      ],
      "StorefrontUsers": [StorefrontUser],
      "Theme": Theme,
      "Theme2": Theme2,
      "currencyCode": "abc123",
      "ianaTimezone": "abc123",
      "id": uuid,
      "qaAuthSettings": jsonb
    }
  }
}
Queries
StorefrontUsers
Description
An array relationship

Response
Returns [StorefrontUser!]!

Arguments
Name	Description
distinct_on - [StorefrontUser_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [StorefrontUser_order_by!]	sort the rows by one or more columns
where - StorefrontUser_bool_exp	filter the rows returned
Example
Query
query StorefrontUsers(
  $distinct_on: [StorefrontUser_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [StorefrontUser_order_by!],
  $where: StorefrontUser_bool_exp
) {
  StorefrontUsers(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    AuditLogs {
      ...AuditLogFragment
    }
    BackupPaymentMethod {
      ...PaymentMethodFragment
    }
    Orders {
      ...OrderFragment
    }
    PaymentMethods {
      ...PaymentMethodFragment
    }
    ShippingAddresses {
      ...AddressFragment
    }
    Site {
      ...SiteFragment
    }
    SkioSmsMessagingHistory {
      ...SkioSmsMessagingHistoryFragment
    }
    Subscriptions {
      ...SubscriptionFragment
    }
    User {
      ...UserFragment
    }
    createdAt
    email
    firstName
    id
    lastName
    phoneNumber
    platformId
    qaToken
    redactedAt
    removedAt
    shopifyTags
    siteId
    updatedAt
  }
}
Variables
{
  "distinct_on": ["createdAt"],
  "limit": 123,
  "offset": 123,
  "order_by": [StorefrontUser_order_by],
  "where": StorefrontUser_bool_exp
}
Response
{
  "data": {
    "StorefrontUsers": [
      {
        "AuditLogs": [AuditLog],
        "BackupPaymentMethod": PaymentMethod,
        "Orders": [Order],
        "PaymentMethods": [PaymentMethod],
        "ShippingAddresses": [Address],
        "Site": Site,
        "SkioSmsMessagingHistory": [
          SkioSmsMessagingHistory
        ],
        "Subscriptions": [Subscription],
        "User": User,
        "createdAt": timestamptz,
        "email": "abc123",
        "firstName": "xyz789",
        "id": uuid,
        "lastName": "xyz789",
        "phoneNumber": "abc123",
        "platformId": "xyz789",
        "qaToken": uuid,
        "redactedAt": timestamptz,
        "removedAt": timestamptz,
        "shopifyTags": jsonb,
        "siteId": uuid,
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
SubscriptionByPk
Description
fetch data from the table: "Subscription" using primary key columns

Response
Returns a Subscription

Arguments
Name	Description
id - uuid!	
Example
Query
query SubscriptionByPk($id: uuid!) {
  SubscriptionByPk(id: $id) {
    AuditLogs {
      ...AuditLogFragment
    }
    BillingPolicy {
      ...PolicyFragment
    }
    CancelFlowSessions {
      ...CancelFlowSessionFragment
    }
    CancelFlowV2Sessions {
      ...CancelFlowV2SessionFragment
    }
    DeliveryPolicy {
      ...PolicyFragment
    }
    Discounts {
      ...DiscountFragment
    }
    FulfillmentOrders {
      ...OrderFragment
    }
    NotificationLogs {
      ...NotificationLogFragment
    }
    PaymentMethod {
      ...PaymentMethodFragment
    }
    PrepaidDeliveryPolicy {
      ...PolicyFragment
    }
    PrepaidGiftRecipient {
      ...StorefrontUserFragment
    }
    PrepaidSubscriptionLines {
      ...SubscriptionLineFragment
    }
    ShippingAddress {
      ...AddressFragment
    }
    Site {
      ...SiteFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    SubscriptionLines {
      ...SubscriptionLineFragment
    }
    SurpriseDelightSessions {
      ...SurpriseDelightSessionsFragment
    }
    billingPolicyId
    cancelledAt
    createdAt
    currencyCode
    customAttributes
    cyclesCompleted
    deliveryPolicyId
    deliveryPrice
    deliveryPriceOverride
    id
    isPickup
    lastBillingAttemptAt
    metadata
    migrationIndex
    nextBillingDate
    note
    originOrder {
      ...OrderFragment
    }
    originOrderId
    platformId
    prepaidDeliveryPolicyId
    prepaidProductPricesPerDelivery
    shippingAddressId
    siteId
    status
    statusContext
    storefrontUserId
    updatedAt
  }
}
Variables
{"id": uuid}
Response
{
  "data": {
    "SubscriptionByPk": {
      "AuditLogs": [AuditLog],
      "BillingPolicy": Policy,
      "CancelFlowSessions": [CancelFlowSession],
      "CancelFlowV2Sessions": [CancelFlowV2Session],
      "DeliveryPolicy": Policy,
      "Discounts": [Discount],
      "FulfillmentOrders": [Order],
      "NotificationLogs": [NotificationLog],
      "PaymentMethod": PaymentMethod,
      "PrepaidDeliveryPolicy": Policy,
      "PrepaidGiftRecipient": StorefrontUser,
      "PrepaidSubscriptionLines": [SubscriptionLine],
      "ShippingAddress": Address,
      "Site": Site,
      "StorefrontUser": StorefrontUser,
      "SubscriptionLines": [SubscriptionLine],
      "SurpriseDelightSessions": [
        SurpriseDelightSessions
      ],
      "billingPolicyId": uuid,
      "cancelledAt": timestamptz,
      "createdAt": timestamptz,
      "currencyCode": "USD",
      "customAttributes": jsonb,
      "cyclesCompleted": 1,
      "deliveryPolicyId": uuid,
      "deliveryPrice": numeric,
      "deliveryPriceOverride": null,
      "id": uuid,
      "isPickup": true,
      "lastBillingAttemptAt": timestamptz,
      "metadata": jsonb,
      "migrationIndex": null,
      "nextBillingDate": timestamptz,
      "note": "test",
      "originOrder": Order,
      "originOrderId": uuid,
      "platformId": "gid://shopify/SubscriptionContract/12346616394",
      "prepaidDeliveryPolicyId": uuid,
      "prepaidProductPricesPerDelivery": jsonb,
      "shippingAddressId": uuid,
      "siteId": uuid,
      "status": "ACTIVE",
      "statusContext": null,
      "storefrontUserId": uuid,
      "updatedAt": timestamptz
    }
  }
}
Queries
SubscriptionLines
Description
An array relationship

Response
Returns [SubscriptionLine!]!

Arguments
Name	Description
distinct_on - [SubscriptionLine_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [SubscriptionLine_order_by!]	sort the rows by one or more columns
where - SubscriptionLine_bool_exp	filter the rows returned
Example
Query
query SubscriptionLines(
  $distinct_on: [SubscriptionLine_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [SubscriptionLine_order_by!],
  $where: SubscriptionLine_bool_exp
) {
  SubscriptionLines(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    Discounts {
      ...DiscountFragment
    }
    Group {
      ...GroupFragment
    }
    OrderLineItems {
      ...OrderLineItemFragment
    }
    OriginalSellingPlan {
      ...SellingPlanFragment
    }
    PrepaidSubscription {
      ...SubscriptionFragment
    }
    ProductVariant {
      ...ProductVariantFragment
    }
    Subscription {
      ...SubscriptionFragment
    }
    createdAt
    customAttributes
    groupId
    id
    isPrepaid
    ordersRemaining
    platformId
    prepaidSubscriptionId
    priceWithoutDiscount
    productVariantId
    quantity
    reChargeId
    removedAt
    sellingPlanId
    subscriptionId
    taxable
    titleOverride
    updatedAt
  }
}
Variables
{
  "distinct_on": ["createdAt"],
  "limit": 987,
  "offset": 987,
  "order_by": [SubscriptionLine_order_by],
  "where": SubscriptionLine_bool_exp
}
Response
{
  "data": {
    "SubscriptionLines": [
      {
        "Discounts": [Discount],
        "Group": Group,
        "OrderLineItems": [OrderLineItem],
        "OriginalSellingPlan": SellingPlan,
        "PrepaidSubscription": Subscription,
        "ProductVariant": ProductVariant,
        "Subscription": Subscription,
        "createdAt": timestamptz,
        "customAttributes": jsonb,
        "groupId": uuid,
        "id": uuid,
        "isPrepaid": false,
        "ordersRemaining": 123,
        "platformId": "abc123",
        "prepaidSubscriptionId": uuid,
        "priceWithoutDiscount": numeric,
        "productVariantId": uuid,
        "quantity": 123,
        "reChargeId": "xyz789",
        "removedAt": timestamptz,
        "sellingPlanId": uuid,
        "subscriptionId": uuid,
        "taxable": false,
        "titleOverride": "abc123",
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
Subscriptions
Description
An array relationship

Response
Returns [Subscription!]!

Arguments
Name	Description
distinct_on - [Subscription_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [Subscription_order_by!]	sort the rows by one or more columns
where - Subscription_bool_exp	filter the rows returned
Example
Query
query Subscriptions(
  $distinct_on: [Subscription_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [Subscription_order_by!],
  $where: Subscription_bool_exp
) {
  Subscriptions(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    AuditLogs {
      ...AuditLogFragment
    }
    BillingPolicy {
      ...PolicyFragment
    }
    CancelFlowSessions {
      ...CancelFlowSessionFragment
    }
    CancelFlowV2Sessions {
      ...CancelFlowV2SessionFragment
    }
    DeliveryPolicy {
      ...PolicyFragment
    }
    Discounts {
      ...DiscountFragment
    }
    FulfillmentOrders {
      ...OrderFragment
    }
    NotificationLogs {
      ...NotificationLogFragment
    }
    PaymentMethod {
      ...PaymentMethodFragment
    }
    PrepaidDeliveryPolicy {
      ...PolicyFragment
    }
    PrepaidGiftRecipient {
      ...StorefrontUserFragment
    }
    PrepaidSubscriptionLines {
      ...SubscriptionLineFragment
    }
    ShippingAddress {
      ...AddressFragment
    }
    Site {
      ...SiteFragment
    }
    StorefrontUser {
      ...StorefrontUserFragment
    }
    SubscriptionLines {
      ...SubscriptionLineFragment
    }
    SurpriseDelightSessions {
      ...SurpriseDelightSessionsFragment
    }
    billingPolicyId
    cancelledAt
    createdAt
    currencyCode
    customAttributes
    cyclesCompleted
    deliveryPolicyId
    deliveryPrice
    deliveryPriceOverride
    id
    isPickup
    lastBillingAttemptAt
    metadata
    migrationIndex
    nextBillingDate
    note
    originOrder {
      ...OrderFragment
    }
    originOrderId
    platformId
    prepaidDeliveryPolicyId
    prepaidProductPricesPerDelivery
    shippingAddressId
    siteId
    status
    statusContext
    storefrontUserId
    updatedAt
  }
}
Variables
{
  "distinct_on": ["billingPolicyId"],
  "limit": 123,
  "offset": 987,
  "order_by": [Subscription_order_by],
  "where": Subscription_bool_exp
}
Response
{
  "data": {
    "Subscriptions": [
      {
        "AuditLogs": [AuditLog],
        "BillingPolicy": Policy,
        "CancelFlowSessions": [CancelFlowSession],
        "CancelFlowV2Sessions": [CancelFlowV2Session],
        "DeliveryPolicy": Policy,
        "Discounts": [Discount],
        "FulfillmentOrders": [Order],
        "NotificationLogs": [NotificationLog],
        "PaymentMethod": PaymentMethod,
        "PrepaidDeliveryPolicy": Policy,
        "PrepaidGiftRecipient": StorefrontUser,
        "PrepaidSubscriptionLines": [SubscriptionLine],
        "ShippingAddress": Address,
        "Site": Site,
        "StorefrontUser": StorefrontUser,
        "SubscriptionLines": [SubscriptionLine],
        "SurpriseDelightSessions": [
          SurpriseDelightSessions
        ],
        "billingPolicyId": uuid,
        "cancelledAt": timestamptz,
        "createdAt": timestamptz,
        "currencyCode": "USD",
        "customAttributes": jsonb,
        "cyclesCompleted": 1,
        "deliveryPolicyId": uuid,
        "deliveryPrice": numeric,
        "deliveryPriceOverride": null,
        "id": uuid,
        "isPickup": false,
        "lastBillingAttemptAt": timestamptz,
        "metadata": jsonb,
        "migrationIndex": null,
        "nextBillingDate": timestamptz,
        "note": "test",
        "originOrder": Order,
        "originOrderId": uuid,
        "platformId": "gid://shopify/SubscriptionContract/12346616394",
        "prepaidDeliveryPolicyId": uuid,
        "prepaidProductPricesPerDelivery": jsonb,
        "shippingAddressId": uuid,
        "siteId": uuid,
        "status": "ACTIVE",
        "statusContext": null,
        "storefrontUserId": uuid,
        "updatedAt": timestamptz
      }
    ]
  }
}
Queries
SurpriseDelightSessions
Description
An array relationship

Response
Returns [SurpriseDelightSessions!]!

Arguments
Name	Description
distinct_on - [SurpriseDelightSessions_select_column!]	distinct select on columns
limit - Int	limit the number of rows returned
offset - Int	skip the first n rows. Use only with order_by
order_by - [SurpriseDelightSessions_order_by!]	sort the rows by one or more columns
where - SurpriseDelightSessions_bool_exp	filter the rows returned
Example
Query
query SurpriseDelightSessions(
  $distinct_on: [SurpriseDelightSessions_select_column!],
  $limit: Int,
  $offset: Int,
  $order_by: [SurpriseDelightSessions_order_by!],
  $where: SurpriseDelightSessions_bool_exp
) {
  SurpriseDelightSessions(
    distinct_on: $distinct_on,
    limit: $limit,
    offset: $offset,
    order_by: $order_by,
    where: $where
  ) {
    Subscription {
      ...SubscriptionFragment
    }
    created_at
    group
    id
    ruleId
    subscriptionId
  }
}
Variables
{
  "distinct_on": ["created_at"],
  "limit": 987,
  "offset": 123,
  "order_by": [SurpriseDelightSessions_order_by],
  "where": SurpriseDelightSessions_bool_exp
}
Response
{
  "data": {
    "SurpriseDelightSessions": [
      {
        "Subscription": Subscription,
        "created_at": timestamptz,
        "group": "abc123",
        "id": uuid,
        "ruleId": uuid,
        "subscriptionId": uuid
      }
    ]
  }
}
Mutations
addProductVariantToSellingPlanGroup
Description
Add a product variant to selling plan group

Response
Returns an addProductVariantToSellingPlanGroupOutput

Arguments
Name	Description
input - addProductVariantToSellingPlanGroupInput!	
Example
Query
mutation addProductVariantToSellingPlanGroup($input: addProductVariantToSellingPlanGroupInput!) {
  addProductVariantToSellingPlanGroup(input: $input) {
    ok
  }
}
Variables
{"input": addProductVariantToSellingPlanGroupInput}
Response
{"data": {"addProductVariantToSellingPlanGroup": {"ok": false}}}
Mutations
addSubscriptionLine
Description
Adds a product to a subscription, with the option of adding it as a one time item (only valid for the next order). The price is optional, by default it will use the price from Shopify with the closest matching selling plan discount. This doesn't support prepaid subscriptions.

Response
Returns an AddSubscriptionLineOutput

Arguments
Name	Description
input - AddSubscriptionLineInput!	
Example
Query
mutation addSubscriptionLine($input: AddSubscriptionLineInput!) {
  addSubscriptionLine(input: $input) {
    ok
  }
}
Variables
{"input": AddSubscriptionLineInput}
Response
{"data": {"addSubscriptionLine": {"ok": true}}}
Mutations
applyDiscountCode
Description
Apply a discount code on a subscription

Response
Returns an ApplyDiscountCodeOutput

Arguments
Name	Description
input - ApplyDiscountCodeInput!	
Example
Query
mutation applyDiscountCode($input: ApplyDiscountCodeInput!) {
  applyDiscountCode(input: $input) {
    message
    ok
  }
}
Variables
{"input": ApplyDiscountCodeInput}
Response
{
  "data": {
    "applyDiscountCode": {
      "message": "abc123",
      "ok": true
    }
  }
}
Mutations
cancelSubscription
Description
Cancels a specific subscription and associated SubscriptionContract on Shopify. If the subscription is a prepaid subscription, then first calculate remaining shipments and set maxcycles such that subscription will be killed once remaining shipments are processed.

Response
Returns a CancelSubscriptionOutput

Arguments
Name	Description
input - CancelSubscriptionInput!	
Example
Query
mutation cancelSubscription($input: CancelSubscriptionInput!) {
  cancelSubscription(input: $input) {
    ok
  }
}
Variables
{"input": CancelSubscriptionInput}
Response
{"data": {"cancelSubscription": {"ok": false}}}
Mutations
createSubscription
Description
Creates a manual subscription through Skio with the given inputs

Response
Returns a CreateSubscriptionOutput

Arguments
Name	Description
input - CreateSubscriptionInput!	
Example
Query
mutation createSubscription($input: CreateSubscriptionInput!) {
  createSubscription(input: $input) {
    id
    platformId
  }
}
Variables
{"input": CreateSubscriptionInput}
Response
{
  "data": {
    "createSubscription": {
      "id": uuid,
      "platformId": "xyz789"
    }
  }
}
Mutations
pauseSubscription
Description
Pause a subscription

Response
Returns a pauseSubscriptionOutput

Arguments
Name	Description
input - pauseSubscriptionInput!	
Example
Query
mutation pauseSubscription($input: pauseSubscriptionInput!) {
  pauseSubscription(input: $input) {
    message
    ok
  }
}
Variables
{"input": pauseSubscriptionInput}
Response
{
  "data": {
    "pauseSubscription": {
      "message": "abc123",
      "ok": false
    }
  }
}
Mutations
removeProductVariantFromSellingPlanGroup
Description
Remove a product variant from selling plan group

Response
Returns a removeProductVariantFromSellingPlanGroupOutput

Arguments
Name	Description
input - removeProductVariantFromSellingPlanGroupInput!	
Example
Query
mutation removeProductVariantFromSellingPlanGroup($input: removeProductVariantFromSellingPlanGroupInput!) {
  removeProductVariantFromSellingPlanGroup(input: $input) {
    ok
  }
}
Variables
{"input": removeProductVariantFromSellingPlanGroupInput}
Response
{"data": {"removeProductVariantFromSellingPlanGroup": {"ok": true}}}
Mutations
setDeliveryPriceOverride
Description
Force override sub delivery price and set flag (deliveryPriceOverride) so that the sub delivery price would not be affected by other resync actions anymore, unless explicity overwritten again.

Response
Returns a SetDeliveryPriceOverrideOutput

Arguments
Name	Description
input - SetDeliveryPriceOverrideInput!	
Example
Query
mutation setDeliveryPriceOverride($input: SetDeliveryPriceOverrideInput!) {
  setDeliveryPriceOverride(input: $input) {
    subscriptionId
  }
}
Variables
{"input": SetDeliveryPriceOverrideInput}
Response
{
  "data": {
    "setDeliveryPriceOverride": {"subscriptionId": uuid}
  }
}
Mutations
shipNow
Description
Creates a subscription order immediately

Response
Returns a ShipNowOutput

Arguments
Name	Description
input - ShipNowInput!	
Example
Query
mutation shipNow($input: ShipNowInput!) {
  shipNow(input: $input) {
    message
    ok
  }
}
Variables
{"input": ShipNowInput}
Response
{
  "data": {
    "shipNow": {
      "message": "abc123",
      "ok": false
    }
  }
}
Mutations
subscriptionEditInterval
Response
Returns a SubscriptionEditIntervalOutput

Arguments
Name	Description
input - SubscriptionEditIntervalInput!	
Example
Query
mutation subscriptionEditInterval($input: SubscriptionEditIntervalInput!) {
  subscriptionEditInterval(input: $input) {
    subscriptionId
  }
}
Variables
{"input": SubscriptionEditIntervalInput}
Response
{
  "data": {
    "subscriptionEditInterval": {"subscriptionId": uuid}
  }
}
Mutations
subscriptionUpdatePaymentMethod
Response
Returns a SubscriptionUpdatePaymentMethodOutput

Arguments
Name	Description
input - SubscriptionUpdatePaymentMethodInput!	
Example
Query
mutation subscriptionUpdatePaymentMethod($input: SubscriptionUpdatePaymentMethodInput!) {
  subscriptionUpdatePaymentMethod(input: $input) {
    subscriptionId
  }
}
Variables
{"input": SubscriptionUpdatePaymentMethodInput}
Response
{
  "data": {
    "subscriptionUpdatePaymentMethod": {
      "subscriptionId": uuid
    }
  }
}
Mutations
swapSubscriptionProductVariants
Description
Swap product variants for a subscription.

Response
Returns a SwapSubscriptionProductVariantsOutput

Arguments
Name	Description
input - SwapSubscriptionProductVariantsInput!	
Example
Query
mutation swapSubscriptionProductVariants($input: SwapSubscriptionProductVariantsInput!) {
  swapSubscriptionProductVariants(input: $input) {
    ok
  }
}
Variables
{"input": SwapSubscriptionProductVariantsInput}
Response
{"data": {"swapSubscriptionProductVariants": {"ok": true}}}
Mutations
unpauseSubscription
Description
UnpauseSubscription

Response
Returns an unpauseSubscriptionOutput

Arguments
Name	Description
input - unpauseSubscriptionInput!	
Example
Query
mutation unpauseSubscription($input: unpauseSubscriptionInput!) {
  unpauseSubscription(input: $input) {
    message
    ok
  }
}
Variables
{"input": unpauseSubscriptionInput}
Response
{
  "data": {
    "unpauseSubscription": {
      "message": "abc123",
      "ok": false
    }
  }
}
Mutations
updateDynamicBoxSubscription
Description
Update quantity and variants of child items in a dynamic box

Response
Returns an UpdateDynamicBoxSubscriptionOutput!

Arguments
Name	Description
input - UpdateDynamicBoxSubscriptionInput!	
Example
Query
mutation updateDynamicBoxSubscription($input: UpdateDynamicBoxSubscriptionInput!) {
  updateDynamicBoxSubscription(input: $input) {
    ok
  }
}
Variables
{"input": UpdateDynamicBoxSubscriptionInput}
Response
{"data": {"updateDynamicBoxSubscription": {"ok": true}}}
Mutations
updateNextBillingDate
Description
Change next billing date of a subscription. Date format should be an ISO string (YYYY-MM-DD), e.g 2022-01-01T17:44:49.406+00:00

Response
Returns an UpdateNextBillingDateOutput

Arguments
Name	Description
input - UpdateNextBillingDateInput!	
Example
Query
mutation updateNextBillingDate($input: UpdateNextBillingDateInput!) {
  updateNextBillingDate(input: $input) {
    message
    ok
  }
}
Variables
{"input": UpdateNextBillingDateInput}
Response
{
  "data": {
    "updateNextBillingDate": {
      "message": "abc123",
      "ok": false
    }
  }
}
Mutations
updateSiteByPk
Description
update single row of the table: "Site"

Response
Returns a Site

Arguments
Name	Description
_set - Site_set_input	sets the columns of the filtered rows to the given values
pk_columns - Site_pk_columns_input!	
Example
Query
mutation updateSiteByPk(
  $_set: Site_set_input,
  $pk_columns: Site_pk_columns_input!
) {
  updateSiteByPk(
    _set: $_set,
    pk_columns: $pk_columns
  ) {
    Holidays {
      ...HolidayFragment
    }
    Notifications {
      ...NotificationFragment
    }
    Products {
      ...ProductFragment
    }
    SkioSmsMessagingHistory {
      ...SkioSmsMessagingHistoryFragment
    }
    StorefrontUsers {
      ...StorefrontUserFragment
    }
    Theme {
      ...ThemeFragment
    }
    Theme2 {
      ...Theme2Fragment
    }
    currencyCode
    ianaTimezone
    id
    qaAuthSettings
  }
}
Variables
{
  "_set": Site_set_input,
  "pk_columns": Site_pk_columns_input
}
Response
{
  "data": {
    "updateSiteByPk": {
      "Holidays": [Holiday],
      "Notifications": [Notification],
      "Products": [Product],
      "SkioSmsMessagingHistory": [
        SkioSmsMessagingHistory
      ],
      "StorefrontUsers": [StorefrontUser],
      "Theme": Theme,
      "Theme2": Theme2,
      "currencyCode": "abc123",
      "ianaTimezone": "abc123",
      "id": uuid,
      "qaAuthSettings": jsonb
    }
  }
}
Mutations
updateSubscriptionLine
Description
Updates the subscription line (referenced by either a prepaidSubscriptionLineId or a subscriptionLineId) and changes quantity, price, or productVariant. IDs are Skio IDs. Quantity, price, and productVariant are optional, so only provide values for those you want to change.

Response
Returns an UpdateSubscriptionLineOutput

Arguments
Name	Description
input - UpdateSubscriptionLineInput!	
Example
Query
mutation updateSubscriptionLine($input: UpdateSubscriptionLineInput!) {
  updateSubscriptionLine(input: $input) {
    ok
  }
}
Variables
{"input": UpdateSubscriptionLineInput}
Response
{"data": {"updateSubscriptionLine": {"ok": true}}}
Mutations
updateSubscriptionNote
Description
updates a subscriptions note

Response
Returns an UpdateSubscriptionNoteOutput

Arguments
Name	Description
input - UpdateSubscriptionNoteInput!	
Example
Query
mutation updateSubscriptionNote($input: UpdateSubscriptionNoteInput!) {
  updateSubscriptionNote(input: $input) {
    note
    ok
  }
}
Variables
{"input": UpdateSubscriptionNoteInput}
Response
{
  "data": {
    "updateSubscriptionNote": {
      "note": "xyz789",
      "ok": false
    }
  }
}
Mutations
updateSubscriptionShippingAddress
Description
updates a subscriptions shipping address

Response
Returns an UpdateSubscriptionShippingAddressOutput

Arguments
Name	Description
input - UpdateSubscriptionShippingAddressInput!	
Example
Query
mutation updateSubscriptionShippingAddress($input: UpdateSubscriptionShippingAddressInput!) {
  updateSubscriptionShippingAddress(input: $input) {
    message
    ok
  }
}
Variables
{"input": UpdateSubscriptionShippingAddressInput}
Response
{
  "data": {
    "updateSubscriptionShippingAddress": {
      "message": "abc123",
      "ok": true
    }
  }
}
Types
AddSubscriptionLineInput
Fields
Input Field	Description
customAttributes - jsonb	
price - Float	
quantity - Int	
subscriptionId - uuid!	
upsell - Boolean	
variantId - uuid!	
Example
{
  "customAttributes": jsonb,
  "price": 123.45,
  "quantity": 987,
  "subscriptionId": uuid,
  "upsell": false,
  "variantId": uuid
}
Types
AddSubscriptionLineOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": true}
Types
Address
Description
first/last nullable for billing fields

Fields
Field Name	Description
PaymentMethod - PaymentMethod	An object relationship
StorefrontUser - StorefrontUser!	An object relationship
Subscriptions - [Subscription!]!	An array relationship
address1 - String	
address2 - String	
city - String	
company - String	
country - String	
createdAt - timestamptz!	
doorCode - String	
firstName - String	
id - uuid!	
lastName - String	
phoneNumber - String	
platformId - String	
province - String	
storefrontUserId - uuid!	
updatedAt - timestamptz!	
zip - String	
Example
{
  "PaymentMethod": PaymentMethod,
  "StorefrontUser": StorefrontUser,
  "Subscriptions": [Subscription],
  "address1": "abc123",
  "address2": "xyz789",
  "city": "xyz789",
  "company": "xyz789",
  "country": "xyz789",
  "createdAt": timestamptz,
  "doorCode": "xyz789",
  "firstName": "abc123",
  "id": uuid,
  "lastName": "abc123",
  "phoneNumber": "xyz789",
  "platformId": "abc123",
  "province": "xyz789",
  "storefrontUserId": uuid,
  "updatedAt": timestamptz,
  "zip": "xyz789"
}
Types
Address_aggregate_order_by
Description
order by aggregate values of table "Address"

Fields
Input Field	Description
count - order_by	
max - Address_max_order_by	
min - Address_min_order_by	
Example
{
  "count": "asc",
  "max": Address_max_order_by,
  "min": Address_min_order_by
}
Types
Address_bool_exp
Description
Boolean expression to filter rows from the table "Address". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
PaymentMethod - PaymentMethod_bool_exp	
StorefrontUser - StorefrontUser_bool_exp	
Subscriptions - Subscription_bool_exp	
_and - [Address_bool_exp!]	
_not - Address_bool_exp	
_or - [Address_bool_exp!]	
address1 - String_comparison_exp	
address2 - String_comparison_exp	
city - String_comparison_exp	
company - String_comparison_exp	
country - String_comparison_exp	
createdAt - timestamptz_comparison_exp	
doorCode - String_comparison_exp	
firstName - String_comparison_exp	
id - uuid_comparison_exp	
lastName - String_comparison_exp	
phoneNumber - String_comparison_exp	
platformId - String_comparison_exp	
province - String_comparison_exp	
storefrontUserId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
zip - String_comparison_exp	
Example
{
  "PaymentMethod": PaymentMethod_bool_exp,
  "StorefrontUser": StorefrontUser_bool_exp,
  "Subscriptions": Subscription_bool_exp,
  "_and": [Address_bool_exp],
  "_not": Address_bool_exp,
  "_or": [Address_bool_exp],
  "address1": String_comparison_exp,
  "address2": String_comparison_exp,
  "city": String_comparison_exp,
  "company": String_comparison_exp,
  "country": String_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "doorCode": String_comparison_exp,
  "firstName": String_comparison_exp,
  "id": uuid_comparison_exp,
  "lastName": String_comparison_exp,
  "phoneNumber": String_comparison_exp,
  "platformId": String_comparison_exp,
  "province": String_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp,
  "zip": String_comparison_exp
}
Types
Address_max_order_by
Description
order by max() on columns of table "Address"

Fields
Input Field	Description
address1 - order_by	
address2 - order_by	
city - order_by	
company - order_by	
country - order_by	
createdAt - order_by	
doorCode - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
province - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
zip - order_by	
Example
{
  "address1": "asc",
  "address2": "asc",
  "city": "asc",
  "company": "asc",
  "country": "asc",
  "createdAt": "asc",
  "doorCode": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "province": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc",
  "zip": "asc"
}
Types
Address_min_order_by
Description
order by min() on columns of table "Address"

Fields
Input Field	Description
address1 - order_by	
address2 - order_by	
city - order_by	
company - order_by	
country - order_by	
createdAt - order_by	
doorCode - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
province - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
zip - order_by	
Example
{
  "address1": "asc",
  "address2": "asc",
  "city": "asc",
  "company": "asc",
  "country": "asc",
  "createdAt": "asc",
  "doorCode": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "province": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc",
  "zip": "asc"
}
Types
Address_order_by
Description
Ordering options when selecting data from "Address".

Fields
Input Field	Description
PaymentMethod - PaymentMethod_order_by	
StorefrontUser - StorefrontUser_order_by	
Subscriptions_aggregate - Subscription_aggregate_order_by	
address1 - order_by	
address2 - order_by	
city - order_by	
company - order_by	
country - order_by	
createdAt - order_by	
doorCode - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
province - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
zip - order_by	
Example
{
  "PaymentMethod": PaymentMethod_order_by,
  "StorefrontUser": StorefrontUser_order_by,
  "Subscriptions_aggregate": Subscription_aggregate_order_by,
  "address1": "asc",
  "address2": "asc",
  "city": "asc",
  "company": "asc",
  "country": "asc",
  "createdAt": "asc",
  "doorCode": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "province": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc",
  "zip": "asc"
}
Types
Address_select_column
Description
select columns of table "Address"

Values
Enum Value	Description
address1

column name
address2

column name
city

column name
company

column name
country

column name
createdAt

column name
doorCode

column name
firstName

column name
id

column name
lastName

column name
phoneNumber

column name
platformId

column name
province

column name
storefrontUserId

column name
updatedAt

column name
zip

column name
Example
"address1"
Types
Anchor
Description
storefront user select/insert/update kinda funny. select is for seeing all anchor types (I think?!) and insert/update for modifying date

Fields
Field Name	Description
Policy - Policy!	An object relationship
createdAt - timestamptz!	
cutoffDay - Int	
day - Int!	
id - uuid!	
missedAnchorAllowance - Int	
month - Int	
policyId - uuid!	
strictness - String!	
type - String!	
updatedAt - timestamptz!	
Example
{
  "Policy": Policy,
  "createdAt": timestamptz,
  "cutoffDay": 123,
  "day": 987,
  "id": uuid,
  "missedAnchorAllowance": 987,
  "month": 987,
  "policyId": uuid,
  "strictness": "xyz789",
  "type": "xyz789",
  "updatedAt": timestamptz
}
Types
Anchor_aggregate_order_by
Description
order by aggregate values of table "Anchor"

Fields
Input Field	Description
avg - Anchor_avg_order_by	
count - order_by	
max - Anchor_max_order_by	
min - Anchor_min_order_by	
stddev - Anchor_stddev_order_by	
stddev_pop - Anchor_stddev_pop_order_by	
stddev_samp - Anchor_stddev_samp_order_by	
sum - Anchor_sum_order_by	
var_pop - Anchor_var_pop_order_by	
var_samp - Anchor_var_samp_order_by	
variance - Anchor_variance_order_by	
Example
{
  "avg": Anchor_avg_order_by,
  "count": "asc",
  "max": Anchor_max_order_by,
  "min": Anchor_min_order_by,
  "stddev": Anchor_stddev_order_by,
  "stddev_pop": Anchor_stddev_pop_order_by,
  "stddev_samp": Anchor_stddev_samp_order_by,
  "sum": Anchor_sum_order_by,
  "var_pop": Anchor_var_pop_order_by,
  "var_samp": Anchor_var_samp_order_by,
  "variance": Anchor_variance_order_by
}
Types
Anchor_avg_order_by
Description
order by avg() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_bool_exp
Description
Boolean expression to filter rows from the table "Anchor". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Policy - Policy_bool_exp	
_and - [Anchor_bool_exp!]	
_not - Anchor_bool_exp	
_or - [Anchor_bool_exp!]	
createdAt - timestamptz_comparison_exp	
cutoffDay - Int_comparison_exp	
day - Int_comparison_exp	
id - uuid_comparison_exp	
missedAnchorAllowance - Int_comparison_exp	
month - Int_comparison_exp	
policyId - uuid_comparison_exp	
strictness - String_comparison_exp	
type - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Policy": Policy_bool_exp,
  "_and": [Anchor_bool_exp],
  "_not": Anchor_bool_exp,
  "_or": [Anchor_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "cutoffDay": Int_comparison_exp,
  "day": Int_comparison_exp,
  "id": uuid_comparison_exp,
  "missedAnchorAllowance": Int_comparison_exp,
  "month": Int_comparison_exp,
  "policyId": uuid_comparison_exp,
  "strictness": String_comparison_exp,
  "type": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Anchor_max_order_by
Description
order by max() on columns of table "Anchor"

Fields
Input Field	Description
createdAt - order_by	
cutoffDay - order_by	
day - order_by	
id - order_by	
missedAnchorAllowance - order_by	
month - order_by	
policyId - order_by	
strictness - order_by	
type - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "cutoffDay": "asc",
  "day": "asc",
  "id": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc",
  "policyId": "asc",
  "strictness": "asc",
  "type": "asc",
  "updatedAt": "asc"
}
Types
Anchor_min_order_by
Description
order by min() on columns of table "Anchor"

Fields
Input Field	Description
createdAt - order_by	
cutoffDay - order_by	
day - order_by	
id - order_by	
missedAnchorAllowance - order_by	
month - order_by	
policyId - order_by	
strictness - order_by	
type - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "cutoffDay": "asc",
  "day": "asc",
  "id": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc",
  "policyId": "asc",
  "strictness": "asc",
  "type": "asc",
  "updatedAt": "asc"
}
Types
Anchor_stddev_order_by
Description
order by stddev() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_sum_order_by
Description
order by sum() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_var_pop_order_by
Description
order by var_pop() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_var_samp_order_by
Description
order by var_samp() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
Anchor_variance_order_by
Description
order by variance() on columns of table "Anchor"

Fields
Input Field	Description
cutoffDay - order_by	
day - order_by	
missedAnchorAllowance - order_by	
month - order_by	
Example
{
  "cutoffDay": "asc",
  "day": "asc",
  "missedAnchorAllowance": "asc",
  "month": "asc"
}
Types
ApplyDiscountCodeInput
Fields
Input Field	Description
code - String!	
subscriptionId - uuid!	
Example
{
  "code": "xyz789",
  "subscriptionId": uuid
}
Types
ApplyDiscountCodeOutput
Fields
Field Name	Description
message - String!	
ok - Boolean!	
Example
{"message": "xyz789", "ok": true}
Types
AuditLog
Description
columns and relationships of "AuditLog"

Fields
Field Name	Description
StorefrontUser - StorefrontUser	An object relationship
Subscription - Subscription	An object relationship
createdAt - timestamptz!	
eventData - jsonb!	
eventType - String!	
id - uuid!	
storefrontUserId - uuid	
subscriptionId - uuid	
updatedAt - timestamptz!	
Example
{
  "StorefrontUser": StorefrontUser,
  "Subscription": Subscription,
  "createdAt": timestamptz,
  "eventData": jsonb,
  "eventType": "xyz789",
  "id": uuid,
  "storefrontUserId": uuid,
  "subscriptionId": uuid,
  "updatedAt": timestamptz
}
Types
AuditLog_aggregate_order_by
Description
order by aggregate values of table "AuditLog"

Fields
Input Field	Description
count - order_by	
max - AuditLog_max_order_by	
min - AuditLog_min_order_by	
Example
{
  "count": "asc",
  "max": AuditLog_max_order_by,
  "min": AuditLog_min_order_by
}
Types
AuditLog_bool_exp
Description
Boolean expression to filter rows from the table "AuditLog". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
StorefrontUser - StorefrontUser_bool_exp	
Subscription - Subscription_bool_exp	
_and - [AuditLog_bool_exp!]	
_not - AuditLog_bool_exp	
_or - [AuditLog_bool_exp!]	
createdAt - timestamptz_comparison_exp	
eventData - jsonb_comparison_exp	
eventType - String_comparison_exp	
id - uuid_comparison_exp	
storefrontUserId - uuid_comparison_exp	
subscriptionId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "StorefrontUser": StorefrontUser_bool_exp,
  "Subscription": Subscription_bool_exp,
  "_and": [AuditLog_bool_exp],
  "_not": AuditLog_bool_exp,
  "_or": [AuditLog_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "eventData": jsonb_comparison_exp,
  "eventType": String_comparison_exp,
  "id": uuid_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
AuditLog_max_order_by
Description
order by max() on columns of table "AuditLog"

Fields
Input Field	Description
createdAt - order_by	
eventType - order_by	
id - order_by	
storefrontUserId - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "eventType": "asc",
  "id": "asc",
  "storefrontUserId": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
AuditLog_min_order_by
Description
order by min() on columns of table "AuditLog"

Fields
Input Field	Description
createdAt - order_by	
eventType - order_by	
id - order_by	
storefrontUserId - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "eventType": "asc",
  "id": "asc",
  "storefrontUserId": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
BillingAttempt_bool_exp
Description
Boolean expression to filter rows from the table "BillingAttempt". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Subscription - Subscription_bool_exp	
_and - [BillingAttempt_bool_exp!]	
_not - BillingAttempt_bool_exp	
_or - [BillingAttempt_bool_exp!]	
billingAttemptedAt - timestamptz_comparison_exp	
createdAt - timestamptz_comparison_exp	
errorCode - String_comparison_exp	
errorMessage - String_comparison_exp	
id - uuid_comparison_exp	
orderPlatformId - String_comparison_exp	
platformId - String_comparison_exp	
subscriptionBillingDate - timestamptz_comparison_exp	
subscriptionId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Subscription": Subscription_bool_exp,
  "_and": [BillingAttempt_bool_exp],
  "_not": BillingAttempt_bool_exp,
  "_or": [BillingAttempt_bool_exp],
  "billingAttemptedAt": timestamptz_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "errorCode": String_comparison_exp,
  "errorMessage": String_comparison_exp,
  "id": uuid_comparison_exp,
  "orderPlatformId": String_comparison_exp,
  "platformId": String_comparison_exp,
  "subscriptionBillingDate": timestamptz_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Boolean
Types
Boolean_comparison_exp
Description
Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - Boolean	
_gt - Boolean	
_gte - Boolean	
_in - [Boolean!]	
_is_null - Boolean	
_lt - Boolean	
_lte - Boolean	
_neq - Boolean	
_nin - [Boolean!]	
Example
{
  "_eq": true,
  "_gt": false,
  "_gte": false,
  "_in": [true],
  "_is_null": false,
  "_lt": false,
  "_lte": true,
  "_neq": false,
  "_nin": [false]
}
Types
CancelFlowReason
Description
This table is no longer used. Look at CancelFlowV2Reason instead

Fields
Field Name	Description
CancelFlowSession - CancelFlowSession	An object relationship
cancelFlowId - uuid!	
cancelFlowSessionId - uuid	
createdAt - timestamptz!	
id - uuid!	
order - numeric!	
otherReasonBody - String	
reason - String!	
rebuttal - String	
updatedAt - timestamptz!	
Example
{
  "CancelFlowSession": CancelFlowSession,
  "cancelFlowId": uuid,
  "cancelFlowSessionId": uuid,
  "createdAt": timestamptz,
  "id": uuid,
  "order": numeric,
  "otherReasonBody": "xyz789",
  "reason": "abc123",
  "rebuttal": "abc123",
  "updatedAt": timestamptz
}
Types
CancelFlowReason_bool_exp
Description
Boolean expression to filter rows from the table "CancelFlowReason". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowSession - CancelFlowSession_bool_exp	
_and - [CancelFlowReason_bool_exp!]	
_not - CancelFlowReason_bool_exp	
_or - [CancelFlowReason_bool_exp!]	
cancelFlowId - uuid_comparison_exp	
cancelFlowSessionId - uuid_comparison_exp	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
order - numeric_comparison_exp	
otherReasonBody - String_comparison_exp	
reason - String_comparison_exp	
rebuttal - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "CancelFlowSession": CancelFlowSession_bool_exp,
  "_and": [CancelFlowReason_bool_exp],
  "_not": CancelFlowReason_bool_exp,
  "_or": [CancelFlowReason_bool_exp],
  "cancelFlowId": uuid_comparison_exp,
  "cancelFlowSessionId": uuid_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "order": numeric_comparison_exp,
  "otherReasonBody": String_comparison_exp,
  "reason": String_comparison_exp,
  "rebuttal": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
CancelFlowReason_order_by
Description
Ordering options when selecting data from "CancelFlowReason".

Fields
Input Field	Description
CancelFlowSession - CancelFlowSession_order_by	
cancelFlowId - order_by	
cancelFlowSessionId - order_by	
createdAt - order_by	
id - order_by	
order - order_by	
otherReasonBody - order_by	
reason - order_by	
rebuttal - order_by	
updatedAt - order_by	
Example
{
  "CancelFlowSession": CancelFlowSession_order_by,
  "cancelFlowId": "asc",
  "cancelFlowSessionId": "asc",
  "createdAt": "asc",
  "id": "asc",
  "order": "asc",
  "otherReasonBody": "asc",
  "reason": "asc",
  "rebuttal": "asc",
  "updatedAt": "asc"
}
Types
CancelFlowSession
Description
This table is no longer used. Look at CancelFlowV2Session

Fields
Field Name	Description
CancelFlowReason - CancelFlowReason	An object relationship
Discounts - [Discount!]!	An array relationship
Subscription - Subscription!	An object relationship
cancelFlowId - uuid!	
createdAt - timestamptz!	
id - uuid!	
status - String	
subscriptionId - uuid!	
updatedAt - timestamptz!	
Example
{
  "CancelFlowReason": CancelFlowReason,
  "Discounts": [Discount],
  "Subscription": Subscription,
  "cancelFlowId": uuid,
  "createdAt": timestamptz,
  "id": uuid,
  "status": "abc123",
  "subscriptionId": uuid,
  "updatedAt": timestamptz
}
Types
CancelFlowSession_aggregate_order_by
Description
order by aggregate values of table "CancelFlowSession"

Fields
Input Field	Description
count - order_by	
max - CancelFlowSession_max_order_by	
min - CancelFlowSession_min_order_by	
Example
{
  "count": "asc",
  "max": CancelFlowSession_max_order_by,
  "min": CancelFlowSession_min_order_by
}
Types
CancelFlowSession_bool_exp
Description
Boolean expression to filter rows from the table "CancelFlowSession". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowReason - CancelFlowReason_bool_exp	
Discounts - Discount_bool_exp	
Subscription - Subscription_bool_exp	
_and - [CancelFlowSession_bool_exp!]	
_not - CancelFlowSession_bool_exp	
_or - [CancelFlowSession_bool_exp!]	
cancelFlowId - uuid_comparison_exp	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
status - String_comparison_exp	
subscriptionId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "CancelFlowReason": CancelFlowReason_bool_exp,
  "Discounts": Discount_bool_exp,
  "Subscription": Subscription_bool_exp,
  "_and": [CancelFlowSession_bool_exp],
  "_not": CancelFlowSession_bool_exp,
  "_or": [CancelFlowSession_bool_exp],
  "cancelFlowId": uuid_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "status": String_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
CancelFlowSession_max_order_by
Description
order by max() on columns of table "CancelFlowSession"

Fields
Input Field	Description
cancelFlowId - order_by	
createdAt - order_by	
id - order_by	
status - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "cancelFlowId": "asc",
  "createdAt": "asc",
  "id": "asc",
  "status": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
CancelFlowSession_min_order_by
Description
order by min() on columns of table "CancelFlowSession"

Fields
Input Field	Description
cancelFlowId - order_by	
createdAt - order_by	
id - order_by	
status - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "cancelFlowId": "asc",
  "createdAt": "asc",
  "id": "asc",
  "status": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
CancelFlowSession_order_by
Description
Ordering options when selecting data from "CancelFlowSession".

Fields
Input Field	Description
CancelFlowReason - CancelFlowReason_order_by	
Discounts_aggregate - Discount_aggregate_order_by	
Subscription - Subscription_order_by	
cancelFlowId - order_by	
createdAt - order_by	
id - order_by	
status - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "CancelFlowReason": CancelFlowReason_order_by,
  "Discounts_aggregate": Discount_aggregate_order_by,
  "Subscription": Subscription_order_by,
  "cancelFlowId": "asc",
  "createdAt": "asc",
  "id": "asc",
  "status": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
CancelFlowV2Reason
Description
Explanations for fields can be found here https://www.notion.so/CancelFlowV2Reason-Schema-497069ec1c1e4ef1ac6b90e917cc84f7?pvs=4

Fields
Field Name	Description
CancelFlowV2Rebuttals - [CancelFlowV2Rebuttal!]!	An array relationship
cancelFlowId - uuid!	
childrenReasonIds - jsonb	
created_at - timestamptz!	
enableCustomerInput - Boolean!	
enabled - Boolean!	
id - uuid!	
isMultipleActions - Boolean!	
parentReasonId - uuid	
reason - String!	
removed_at - timestamptz	
updated_at - timestamptz!	
Example
{
  "CancelFlowV2Rebuttals": [CancelFlowV2Rebuttal],
  "cancelFlowId": uuid,
  "childrenReasonIds": jsonb,
  "created_at": timestamptz,
  "enableCustomerInput": true,
  "enabled": true,
  "id": uuid,
  "isMultipleActions": true,
  "parentReasonId": uuid,
  "reason": "abc123",
  "removed_at": timestamptz,
  "updated_at": timestamptz
}
Types
CancelFlowV2Reason_bool_exp
Description
Boolean expression to filter rows from the table "CancelFlowV2Reason". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowV2Rebuttals - CancelFlowV2Rebuttal_bool_exp	
_and - [CancelFlowV2Reason_bool_exp!]	
_not - CancelFlowV2Reason_bool_exp	
_or - [CancelFlowV2Reason_bool_exp!]	
cancelFlowId - uuid_comparison_exp	
childrenReasonIds - jsonb_comparison_exp	
created_at - timestamptz_comparison_exp	
enableCustomerInput - Boolean_comparison_exp	
enabled - Boolean_comparison_exp	
id - uuid_comparison_exp	
isMultipleActions - Boolean_comparison_exp	
parentReasonId - uuid_comparison_exp	
reason - String_comparison_exp	
removed_at - timestamptz_comparison_exp	
updated_at - timestamptz_comparison_exp	
Example
{
  "CancelFlowV2Rebuttals": CancelFlowV2Rebuttal_bool_exp,
  "_and": [CancelFlowV2Reason_bool_exp],
  "_not": CancelFlowV2Reason_bool_exp,
  "_or": [CancelFlowV2Reason_bool_exp],
  "cancelFlowId": uuid_comparison_exp,
  "childrenReasonIds": jsonb_comparison_exp,
  "created_at": timestamptz_comparison_exp,
  "enableCustomerInput": Boolean_comparison_exp,
  "enabled": Boolean_comparison_exp,
  "id": uuid_comparison_exp,
  "isMultipleActions": Boolean_comparison_exp,
  "parentReasonId": uuid_comparison_exp,
  "reason": String_comparison_exp,
  "removed_at": timestamptz_comparison_exp,
  "updated_at": timestamptz_comparison_exp
}
Types
CancelFlowV2Rebuttal
Description
Explanations for fields can be found here. https://www.notion.so/CancelFlowV2Rebuttal-Schema-3dd686bbd2e0426da6415d749f265b12?pvs=4

Fields
Field Name	Description
CancelFlowV2Reason - CancelFlowV2Reason	An object relationship
action - String!	
actions - jsonb	
cancelFlowReasonId - uuid	
condition - jsonb	
conditionsV2 - jsonb	
created_at - timestamptz!	
enabled - Boolean!	
id - uuid!	
isRebuttalURL - Boolean!	
nextRebuttalId - uuid	
options - jsonb	
parentRebuttalId - uuid	
rebuttal - String!	
rebuttalMediaUrl - String	
removed_at - timestamptz	
updated_at - timestamptz!	
Example
{
  "CancelFlowV2Reason": CancelFlowV2Reason,
  "action": "xyz789",
  "actions": jsonb,
  "cancelFlowReasonId": uuid,
  "condition": jsonb,
  "conditionsV2": jsonb,
  "created_at": timestamptz,
  "enabled": false,
  "id": uuid,
  "isRebuttalURL": true,
  "nextRebuttalId": uuid,
  "options": jsonb,
  "parentRebuttalId": uuid,
  "rebuttal": "xyz789",
  "rebuttalMediaUrl": "abc123",
  "removed_at": timestamptz,
  "updated_at": timestamptz
}
Types
CancelFlowV2Rebuttal_bool_exp
Description
Boolean expression to filter rows from the table "CancelFlowV2Rebuttal". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowV2Reason - CancelFlowV2Reason_bool_exp	
_and - [CancelFlowV2Rebuttal_bool_exp!]	
_not - CancelFlowV2Rebuttal_bool_exp	
_or - [CancelFlowV2Rebuttal_bool_exp!]	
action - String_comparison_exp	
actions - jsonb_comparison_exp	
cancelFlowReasonId - uuid_comparison_exp	
condition - jsonb_comparison_exp	
conditionsV2 - jsonb_comparison_exp	
created_at - timestamptz_comparison_exp	
enabled - Boolean_comparison_exp	
id - uuid_comparison_exp	
isRebuttalURL - Boolean_comparison_exp	
nextRebuttalId - uuid_comparison_exp	
options - jsonb_comparison_exp	
parentRebuttalId - uuid_comparison_exp	
rebuttal - String_comparison_exp	
rebuttalMediaUrl - String_comparison_exp	
removed_at - timestamptz_comparison_exp	
updated_at - timestamptz_comparison_exp	
Example
{
  "CancelFlowV2Reason": CancelFlowV2Reason_bool_exp,
  "_and": [CancelFlowV2Rebuttal_bool_exp],
  "_not": CancelFlowV2Rebuttal_bool_exp,
  "_or": [CancelFlowV2Rebuttal_bool_exp],
  "action": String_comparison_exp,
  "actions": jsonb_comparison_exp,
  "cancelFlowReasonId": uuid_comparison_exp,
  "condition": jsonb_comparison_exp,
  "conditionsV2": jsonb_comparison_exp,
  "created_at": timestamptz_comparison_exp,
  "enabled": Boolean_comparison_exp,
  "id": uuid_comparison_exp,
  "isRebuttalURL": Boolean_comparison_exp,
  "nextRebuttalId": uuid_comparison_exp,
  "options": jsonb_comparison_exp,
  "parentRebuttalId": uuid_comparison_exp,
  "rebuttal": String_comparison_exp,
  "rebuttalMediaUrl": String_comparison_exp,
  "removed_at": timestamptz_comparison_exp,
  "updated_at": timestamptz_comparison_exp
}
Types
CancelFlowV2Session
Description
Explanation for fields can be found here https://www.notion.so/CancelFlowV2Session-Schema-49caa9d13ff14bf9b2d029e9512379eb?pvs=4

Fields
Field Name	Description
CancelFlowSession - CancelFlowSession	An object relationship
Site - Site	An object relationship
Subscription - Subscription!	An object relationship
action - String	
actions - jsonb	
actionsV2 - jsonb	
actionsV2MultiStep - jsonb	
cancelFlowId - uuid!	
conditions - jsonb	
conditionsV2 - jsonb	
created_at - timestamptz!	
id - uuid!	
isMultipleActions - Boolean!	
isOtherReason - Boolean!	
isSplashScreen - Boolean	
reason - String	
reasonPath - jsonb	
rebuttal - String	
rebuttalOptions - jsonb	
shownActions - jsonb	
shownReasons - jsonb	
shownRebuttals - jsonb	
siteId - uuid	
status - String	
subscriptionId - uuid!	
updated_at - timestamptz!	
Example
{
  "CancelFlowSession": CancelFlowSession,
  "Site": Site,
  "Subscription": Subscription,
  "action": "xyz789",
  "actions": jsonb,
  "actionsV2": jsonb,
  "actionsV2MultiStep": jsonb,
  "cancelFlowId": uuid,
  "conditions": jsonb,
  "conditionsV2": jsonb,
  "created_at": timestamptz,
  "id": uuid,
  "isMultipleActions": false,
  "isOtherReason": true,
  "isSplashScreen": true,
  "reason": "abc123",
  "reasonPath": jsonb,
  "rebuttal": "abc123",
  "rebuttalOptions": jsonb,
  "shownActions": jsonb,
  "shownReasons": jsonb,
  "shownRebuttals": jsonb,
  "siteId": uuid,
  "status": "xyz789",
  "subscriptionId": uuid,
  "updated_at": timestamptz
}
Types
CancelFlowV2Session_aggregate_order_by
Description
order by aggregate values of table "CancelFlowV2Session"

Fields
Input Field	Description
count - order_by	
max - CancelFlowV2Session_max_order_by	
min - CancelFlowV2Session_min_order_by	
Example
{
  "count": "asc",
  "max": CancelFlowV2Session_max_order_by,
  "min": CancelFlowV2Session_min_order_by
}
Types
CancelFlowV2Session_bool_exp
Description
Boolean expression to filter rows from the table "CancelFlowV2Session". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowSession - CancelFlowSession_bool_exp	
Site - Site_bool_exp	
Subscription - Subscription_bool_exp	
_and - [CancelFlowV2Session_bool_exp!]	
_not - CancelFlowV2Session_bool_exp	
_or - [CancelFlowV2Session_bool_exp!]	
action - String_comparison_exp	
actions - jsonb_comparison_exp	
actionsV2 - jsonb_comparison_exp	
actionsV2MultiStep - jsonb_comparison_exp	
cancelFlowId - uuid_comparison_exp	
conditions - jsonb_comparison_exp	
conditionsV2 - jsonb_comparison_exp	
created_at - timestamptz_comparison_exp	
id - uuid_comparison_exp	
isMultipleActions - Boolean_comparison_exp	
isOtherReason - Boolean_comparison_exp	
isSplashScreen - Boolean_comparison_exp	
reason - String_comparison_exp	
reasonPath - jsonb_comparison_exp	
rebuttal - String_comparison_exp	
rebuttalOptions - jsonb_comparison_exp	
shownActions - jsonb_comparison_exp	
shownReasons - jsonb_comparison_exp	
shownRebuttals - jsonb_comparison_exp	
siteId - uuid_comparison_exp	
status - String_comparison_exp	
subscriptionId - uuid_comparison_exp	
updated_at - timestamptz_comparison_exp	
Example
{
  "CancelFlowSession": CancelFlowSession_bool_exp,
  "Site": Site_bool_exp,
  "Subscription": Subscription_bool_exp,
  "_and": [CancelFlowV2Session_bool_exp],
  "_not": CancelFlowV2Session_bool_exp,
  "_or": [CancelFlowV2Session_bool_exp],
  "action": String_comparison_exp,
  "actions": jsonb_comparison_exp,
  "actionsV2": jsonb_comparison_exp,
  "actionsV2MultiStep": jsonb_comparison_exp,
  "cancelFlowId": uuid_comparison_exp,
  "conditions": jsonb_comparison_exp,
  "conditionsV2": jsonb_comparison_exp,
  "created_at": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "isMultipleActions": Boolean_comparison_exp,
  "isOtherReason": Boolean_comparison_exp,
  "isSplashScreen": Boolean_comparison_exp,
  "reason": String_comparison_exp,
  "reasonPath": jsonb_comparison_exp,
  "rebuttal": String_comparison_exp,
  "rebuttalOptions": jsonb_comparison_exp,
  "shownActions": jsonb_comparison_exp,
  "shownReasons": jsonb_comparison_exp,
  "shownRebuttals": jsonb_comparison_exp,
  "siteId": uuid_comparison_exp,
  "status": String_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "updated_at": timestamptz_comparison_exp
}
Types
CancelFlowV2Session_max_order_by
Description
order by max() on columns of table "CancelFlowV2Session"

Fields
Input Field	Description
action - order_by	
cancelFlowId - order_by	
created_at - order_by	
id - order_by	
reason - order_by	
rebuttal - order_by	
siteId - order_by	
status - order_by	
subscriptionId - order_by	
updated_at - order_by	
Example
{
  "action": "asc",
  "cancelFlowId": "asc",
  "created_at": "asc",
  "id": "asc",
  "reason": "asc",
  "rebuttal": "asc",
  "siteId": "asc",
  "status": "asc",
  "subscriptionId": "asc",
  "updated_at": "asc"
}
Types
CancelFlowV2Session_min_order_by
Description
order by min() on columns of table "CancelFlowV2Session"

Fields
Input Field	Description
action - order_by	
cancelFlowId - order_by	
created_at - order_by	
id - order_by	
reason - order_by	
rebuttal - order_by	
siteId - order_by	
status - order_by	
subscriptionId - order_by	
updated_at - order_by	
Example
{
  "action": "asc",
  "cancelFlowId": "asc",
  "created_at": "asc",
  "id": "asc",
  "reason": "asc",
  "rebuttal": "asc",
  "siteId": "asc",
  "status": "asc",
  "subscriptionId": "asc",
  "updated_at": "asc"
}
Types
CancelSubscriptionInput
Fields
Input Field	Description
cancelSessionId - String	
permanentlyCancel - Boolean	
shouldSendNotif - Boolean	
subscriptionId - uuid!	
Example
{
  "cancelSessionId": "xyz789",
  "permanentlyCancel": false,
  "shouldSendNotif": true,
  "subscriptionId": uuid
}
Types
CancelSubscriptionOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": false}
Types
CreateSubscriptionCustomAttribute
Fields
Input Field	Description
key - String!	
value - String	
Example
{
  "key": "xyz789",
  "value": "abc123"
}
Types
CreateSubscriptionInput
Fields
Input Field	Description
addressId - uuid!	
billingPolicyInfo - CreateSubscriptionPolicyInfo!	
customAttributes - [CreateSubscriptionCustomAttribute!]	
discountCode - String	
nextBillingDate - String	
paymentMethodId - uuid!	
prepaidPolicyInfo - CreateSubscriptionPolicyInfo	
storefrontUserId - uuid!	
subscriptionLines - [CreateSubscriptionLine!]!	
subscriptionType - CreateSubscriptionType!	
Example
{
  "addressId": uuid,
  "billingPolicyInfo": CreateSubscriptionPolicyInfo,
  "customAttributes": [CreateSubscriptionCustomAttribute],
  "discountCode": "abc123",
  "nextBillingDate": "xyz789",
  "paymentMethodId": uuid,
  "prepaidPolicyInfo": CreateSubscriptionPolicyInfo,
  "storefrontUserId": uuid,
  "subscriptionLines": [CreateSubscriptionLine],
  "subscriptionType": "PREPAID"
}
Types
CreateSubscriptionLine
Fields
Input Field	Description
price - Float	
quantity - Int!	
variantId - uuid!	
Example
{"price": 123.45, "quantity": 123, "variantId": uuid}
Types
CreateSubscriptionOutput
Fields
Field Name	Description
id - uuid!	
platformId - String	
Example
{
  "id": uuid,
  "platformId": "xyz789"
}
Types
CreateSubscriptionPolicyInfo
Fields
Input Field	Description
interval - SellingPlanIntervalEnum!	
intervalCount - Int!	
Example
{"interval": "DAY", "intervalCount": 987}
Types
CreateSubscriptionType
Values
Enum Value	Description
PREPAID

SUBSCRIBE_AND_SAVE

Example
"PREPAID"
Types
Discount
Description
We stick the objects on here since we want to be able to point multiple discounts at them.

Fields
Field Name	Description
CancelFlowSession - CancelFlowSession	An object relationship
Group - Group	An object relationship
GroupPlan - GroupPlan	An object relationship
OrderLineItem - OrderLineItem	An object relationship
ShippingLine - ShippingLine	An object relationship
Subscription - Subscription	An object relationship
SubscriptionLine - SubscriptionLine	An object relationship
appliesOnEachItem - Boolean	If true, then the discount is applied to each of the entitled items. If false, then the amount is split across all of the entitled items.
cancelFlowSessionId - uuid	
createdAt - timestamptz!	
fixedValue - numeric	
groupId - uuid	
groupPlanId - uuid	
id - uuid!	
maxTimesUsed - Int	
orderLineItemId - uuid	
percentage - numeric	
platformId - String	
redeemCode - String	
shippingLineId - uuid	
subscriptionId - uuid	
subscriptionLineId - uuid	
timesUsed - Int	
title - String	
type - String	
updatedAt - timestamptz!	
Example
{
  "CancelFlowSession": CancelFlowSession,
  "Group": Group,
  "GroupPlan": GroupPlan,
  "OrderLineItem": OrderLineItem,
  "ShippingLine": ShippingLine,
  "Subscription": Subscription,
  "SubscriptionLine": SubscriptionLine,
  "appliesOnEachItem": false,
  "cancelFlowSessionId": uuid,
  "createdAt": timestamptz,
  "fixedValue": numeric,
  "groupId": uuid,
  "groupPlanId": uuid,
  "id": uuid,
  "maxTimesUsed": 987,
  "orderLineItemId": uuid,
  "percentage": numeric,
  "platformId": "xyz789",
  "redeemCode": "xyz789",
  "shippingLineId": uuid,
  "subscriptionId": uuid,
  "subscriptionLineId": uuid,
  "timesUsed": 987,
  "title": "abc123",
  "type": "xyz789",
  "updatedAt": timestamptz
}
Types
Discount_aggregate_order_by
Description
order by aggregate values of table "Discount"

Fields
Input Field	Description
avg - Discount_avg_order_by	
count - order_by	
max - Discount_max_order_by	
min - Discount_min_order_by	
stddev - Discount_stddev_order_by	
stddev_pop - Discount_stddev_pop_order_by	
stddev_samp - Discount_stddev_samp_order_by	
sum - Discount_sum_order_by	
var_pop - Discount_var_pop_order_by	
var_samp - Discount_var_samp_order_by	
variance - Discount_variance_order_by	
Example
{
  "avg": Discount_avg_order_by,
  "count": "asc",
  "max": Discount_max_order_by,
  "min": Discount_min_order_by,
  "stddev": Discount_stddev_order_by,
  "stddev_pop": Discount_stddev_pop_order_by,
  "stddev_samp": Discount_stddev_samp_order_by,
  "sum": Discount_sum_order_by,
  "var_pop": Discount_var_pop_order_by,
  "var_samp": Discount_var_samp_order_by,
  "variance": Discount_variance_order_by
}
Types
Discount_avg_order_by
Description
order by avg() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_bool_exp
Description
Boolean expression to filter rows from the table "Discount". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
CancelFlowSession - CancelFlowSession_bool_exp	
Group - Group_bool_exp	
GroupPlan - GroupPlan_bool_exp	
OrderLineItem - OrderLineItem_bool_exp	
ShippingLine - ShippingLine_bool_exp	
Subscription - Subscription_bool_exp	
SubscriptionLine - SubscriptionLine_bool_exp	
_and - [Discount_bool_exp!]	
_not - Discount_bool_exp	
_or - [Discount_bool_exp!]	
appliesOnEachItem - Boolean_comparison_exp	
cancelFlowSessionId - uuid_comparison_exp	
createdAt - timestamptz_comparison_exp	
fixedValue - numeric_comparison_exp	
groupId - uuid_comparison_exp	
groupPlanId - uuid_comparison_exp	
id - uuid_comparison_exp	
maxTimesUsed - Int_comparison_exp	
orderLineItemId - uuid_comparison_exp	
percentage - numeric_comparison_exp	
platformId - String_comparison_exp	
redeemCode - String_comparison_exp	
shippingLineId - uuid_comparison_exp	
subscriptionId - uuid_comparison_exp	
subscriptionLineId - uuid_comparison_exp	
timesUsed - Int_comparison_exp	
title - String_comparison_exp	
type - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "CancelFlowSession": CancelFlowSession_bool_exp,
  "Group": Group_bool_exp,
  "GroupPlan": GroupPlan_bool_exp,
  "OrderLineItem": OrderLineItem_bool_exp,
  "ShippingLine": ShippingLine_bool_exp,
  "Subscription": Subscription_bool_exp,
  "SubscriptionLine": SubscriptionLine_bool_exp,
  "_and": [Discount_bool_exp],
  "_not": Discount_bool_exp,
  "_or": [Discount_bool_exp],
  "appliesOnEachItem": Boolean_comparison_exp,
  "cancelFlowSessionId": uuid_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "fixedValue": numeric_comparison_exp,
  "groupId": uuid_comparison_exp,
  "groupPlanId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "maxTimesUsed": Int_comparison_exp,
  "orderLineItemId": uuid_comparison_exp,
  "percentage": numeric_comparison_exp,
  "platformId": String_comparison_exp,
  "redeemCode": String_comparison_exp,
  "shippingLineId": uuid_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "subscriptionLineId": uuid_comparison_exp,
  "timesUsed": Int_comparison_exp,
  "title": String_comparison_exp,
  "type": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Discount_max_order_by
Description
order by max() on columns of table "Discount"

Fields
Input Field	Description
cancelFlowSessionId - order_by	
createdAt - order_by	
fixedValue - order_by	
groupId - order_by	
groupPlanId - order_by	
id - order_by	
maxTimesUsed - order_by	
orderLineItemId - order_by	
percentage - order_by	
platformId - order_by	
redeemCode - order_by	
shippingLineId - order_by	
subscriptionId - order_by	
subscriptionLineId - order_by	
timesUsed - order_by	
title - order_by	
type - order_by	
updatedAt - order_by	
Example
{
  "cancelFlowSessionId": "asc",
  "createdAt": "asc",
  "fixedValue": "asc",
  "groupId": "asc",
  "groupPlanId": "asc",
  "id": "asc",
  "maxTimesUsed": "asc",
  "orderLineItemId": "asc",
  "percentage": "asc",
  "platformId": "asc",
  "redeemCode": "asc",
  "shippingLineId": "asc",
  "subscriptionId": "asc",
  "subscriptionLineId": "asc",
  "timesUsed": "asc",
  "title": "asc",
  "type": "asc",
  "updatedAt": "asc"
}
Types
Discount_min_order_by
Description
order by min() on columns of table "Discount"

Fields
Input Field	Description
cancelFlowSessionId - order_by	
createdAt - order_by	
fixedValue - order_by	
groupId - order_by	
groupPlanId - order_by	
id - order_by	
maxTimesUsed - order_by	
orderLineItemId - order_by	
percentage - order_by	
platformId - order_by	
redeemCode - order_by	
shippingLineId - order_by	
subscriptionId - order_by	
subscriptionLineId - order_by	
timesUsed - order_by	
title - order_by	
type - order_by	
updatedAt - order_by	
Example
{
  "cancelFlowSessionId": "asc",
  "createdAt": "asc",
  "fixedValue": "asc",
  "groupId": "asc",
  "groupPlanId": "asc",
  "id": "asc",
  "maxTimesUsed": "asc",
  "orderLineItemId": "asc",
  "percentage": "asc",
  "platformId": "asc",
  "redeemCode": "asc",
  "shippingLineId": "asc",
  "subscriptionId": "asc",
  "subscriptionLineId": "asc",
  "timesUsed": "asc",
  "title": "asc",
  "type": "asc",
  "updatedAt": "asc"
}
Types
Discount_stddev_order_by
Description
order by stddev() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_sum_order_by
Description
order by sum() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_var_pop_order_by
Description
order by var_pop() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_var_samp_order_by
Description
order by var_samp() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
Discount_variance_order_by
Description
order by variance() on columns of table "Discount"

Fields
Input Field	Description
fixedValue - order_by	
maxTimesUsed - order_by	
percentage - order_by	
timesUsed - order_by	
Example
{
  "fixedValue": "asc",
  "maxTimesUsed": "asc",
  "percentage": "asc",
  "timesUsed": "asc"
}
Types
DynamicBox
Description
columns and relationships of "DynamicBox"

Fields
Field Name	Description
DynamicBox_SelectableProductVariants - [DynamicBox_SelectableProductVariant!]!	An array relationship
Product - Product!	An object relationship
fixedDiscount - jsonb	
id - uuid!	
percentDiscount - jsonb	
sizeInterval - jsonb	
sizeRange - jsonb	
Example
{
  "DynamicBox_SelectableProductVariants": [
    DynamicBox_SelectableProductVariant
  ],
  "Product": Product,
  "fixedDiscount": jsonb,
  "id": uuid,
  "percentDiscount": jsonb,
  "sizeInterval": jsonb,
  "sizeRange": jsonb
}
Types
DynamicBoxConfigInput
Fields
Input Field	Description
boxId - String!	
boxIndex - String!	
boxSectionId - String	
Example
{
  "boxId": "xyz789",
  "boxIndex": "xyz789",
  "boxSectionId": "xyz789"
}
Types
DynamicBoxContentInput
Fields
Input Field	Description
quantity - Int!	
variantId - String!	
Example
{"quantity": 987, "variantId": "xyz789"}
Types
DynamicBox_SelectableProductVariant
Description
columns and relationships of "DynamicBox_SelectableProductVariant"

Fields
Field Name	Description
DynamicBox - DynamicBox!	An object relationship
SelectableProductVariant - ProductVariant!	An object relationship
deletedAt - timestamp	
dynamicBoxId - uuid!	
productVariantId - uuid!	
Example
{
  "DynamicBox": DynamicBox,
  "SelectableProductVariant": ProductVariant,
  "deletedAt": timestamp,
  "dynamicBoxId": uuid,
  "productVariantId": uuid
}
Types
DynamicBox_SelectableProductVariant_aggregate_order_by
Description
order by aggregate values of table "DynamicBox_SelectableProductVariant"

Fields
Input Field	Description
count - order_by	
max - DynamicBox_SelectableProductVariant_max_order_by	
min - DynamicBox_SelectableProductVariant_min_order_by	
Example
{
  "count": "asc",
  "max": DynamicBox_SelectableProductVariant_max_order_by,
  "min": DynamicBox_SelectableProductVariant_min_order_by
}
Types
DynamicBox_SelectableProductVariant_bool_exp
Description
Boolean expression to filter rows from the table "DynamicBox_SelectableProductVariant". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DynamicBox - DynamicBox_bool_exp	
SelectableProductVariant - ProductVariant_bool_exp	
_and - [DynamicBox_SelectableProductVariant_bool_exp!]	
_not - DynamicBox_SelectableProductVariant_bool_exp	
_or - [DynamicBox_SelectableProductVariant_bool_exp!]	
deletedAt - timestamp_comparison_exp	
dynamicBoxId - uuid_comparison_exp	
productVariantId - uuid_comparison_exp	
Example
{
  "DynamicBox": DynamicBox_bool_exp,
  "SelectableProductVariant": ProductVariant_bool_exp,
  "_and": [DynamicBox_SelectableProductVariant_bool_exp],
  "_not": DynamicBox_SelectableProductVariant_bool_exp,
  "_or": [DynamicBox_SelectableProductVariant_bool_exp],
  "deletedAt": timestamp_comparison_exp,
  "dynamicBoxId": uuid_comparison_exp,
  "productVariantId": uuid_comparison_exp
}
Types
DynamicBox_SelectableProductVariant_max_order_by
Description
order by max() on columns of table "DynamicBox_SelectableProductVariant"

Fields
Input Field	Description
deletedAt - order_by	
dynamicBoxId - order_by	
productVariantId - order_by	
Example
{"deletedAt": "asc", "dynamicBoxId": "asc", "productVariantId": "asc"}
Types
DynamicBox_SelectableProductVariant_min_order_by
Description
order by min() on columns of table "DynamicBox_SelectableProductVariant"

Fields
Input Field	Description
deletedAt - order_by	
dynamicBoxId - order_by	
productVariantId - order_by	
Example
{"deletedAt": "asc", "dynamicBoxId": "asc", "productVariantId": "asc"}
Types
DynamicBox_bool_exp
Description
Boolean expression to filter rows from the table "DynamicBox". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DynamicBox_SelectableProductVariants - DynamicBox_SelectableProductVariant_bool_exp	
Product - Product_bool_exp	
_and - [DynamicBox_bool_exp!]	
_not - DynamicBox_bool_exp	
_or - [DynamicBox_bool_exp!]	
fixedDiscount - jsonb_comparison_exp	
id - uuid_comparison_exp	
percentDiscount - jsonb_comparison_exp	
sizeInterval - jsonb_comparison_exp	
sizeRange - jsonb_comparison_exp	
Example
{
  "DynamicBox_SelectableProductVariants": DynamicBox_SelectableProductVariant_bool_exp,
  "Product": Product_bool_exp,
  "_and": [DynamicBox_bool_exp],
  "_not": DynamicBox_bool_exp,
  "_or": [DynamicBox_bool_exp],
  "fixedDiscount": jsonb_comparison_exp,
  "id": uuid_comparison_exp,
  "percentDiscount": jsonb_comparison_exp,
  "sizeInterval": jsonb_comparison_exp,
  "sizeRange": jsonb_comparison_exp
}
Types
DynamicBox_order_by
Description
Ordering options when selecting data from "DynamicBox".

Fields
Input Field	Description
DynamicBox_SelectableProductVariants_aggregate - DynamicBox_SelectableProductVariant_aggregate_order_by	
Product - Product_order_by	
fixedDiscount - order_by	
id - order_by	
percentDiscount - order_by	
sizeInterval - order_by	
sizeRange - order_by	
Example
{
  "DynamicBox_SelectableProductVariants_aggregate": DynamicBox_SelectableProductVariant_aggregate_order_by,
  "Product": Product_order_by,
  "fixedDiscount": "asc",
  "id": "asc",
  "percentDiscount": "asc",
  "sizeInterval": "asc",
  "sizeRange": "asc"
}
Types
Float
Example
123.45
Types
Float_comparison_exp
Description
Boolean expression to compare columns of type "Float". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - Float	
_gt - Float	
_gte - Float	
_in - [Float!]	
_is_null - Boolean	
_lt - Float	
_lte - Float	
_neq - Float	
_nin - [Float!]	
Example
{
  "_eq": 987.65,
  "_gt": 123.45,
  "_gte": 987.65,
  "_in": [123.45],
  "_is_null": false,
  "_lt": 123.45,
  "_lte": 123.45,
  "_neq": 987.65,
  "_nin": [987.65]
}
Types
Group
Description
columns and relationships of "Group"

Fields
Field Name	Description
DiscountsPerUser - [Discount!]!	An array relationship
GroupSet - GroupSet	An object relationship
OrderLineItemsIfFirstOrder - [OrderLineItem!]!	An array relationship
SubscriptionLines - [SubscriptionLine!]!	An array relationship
createdAt - timestamptz!	
groupSetId - uuid	
id - uuid!	
maxUsers - Int!	
minUsers - Int!	
updatedAt - timestamptz!	
Example
{
  "DiscountsPerUser": [Discount],
  "GroupSet": GroupSet,
  "OrderLineItemsIfFirstOrder": [OrderLineItem],
  "SubscriptionLines": [SubscriptionLine],
  "createdAt": timestamptz,
  "groupSetId": uuid,
  "id": uuid,
  "maxUsers": 987,
  "minUsers": 123,
  "updatedAt": timestamptz
}
Types
GroupPlan
Description
columns and relationships of "GroupPlan"

Fields
Field Name	Description
DiscountsPerUser - [Discount!]!	An array relationship
GroupSet - GroupSet	An object relationship
SellingPlan - SellingPlan!	An object relationship
createdAt - timestamptz!	
groupSetId - uuid	
id - uuid!	
maxUsers - Int!	
minUsers - Int!	
sellingPlanId - uuid!	
updatedAt - timestamptz!	
Example
{
  "DiscountsPerUser": [Discount],
  "GroupSet": GroupSet,
  "SellingPlan": SellingPlan,
  "createdAt": timestamptz,
  "groupSetId": uuid,
  "id": uuid,
  "maxUsers": 987,
  "minUsers": 987,
  "sellingPlanId": uuid,
  "updatedAt": timestamptz
}
Types
GroupPlan_aggregate_order_by
Description
order by aggregate values of table "GroupPlan"

Fields
Input Field	Description
avg - GroupPlan_avg_order_by	
count - order_by	
max - GroupPlan_max_order_by	
min - GroupPlan_min_order_by	
stddev - GroupPlan_stddev_order_by	
stddev_pop - GroupPlan_stddev_pop_order_by	
stddev_samp - GroupPlan_stddev_samp_order_by	
sum - GroupPlan_sum_order_by	
var_pop - GroupPlan_var_pop_order_by	
var_samp - GroupPlan_var_samp_order_by	
variance - GroupPlan_variance_order_by	
Example
{
  "avg": GroupPlan_avg_order_by,
  "count": "asc",
  "max": GroupPlan_max_order_by,
  "min": GroupPlan_min_order_by,
  "stddev": GroupPlan_stddev_order_by,
  "stddev_pop": GroupPlan_stddev_pop_order_by,
  "stddev_samp": GroupPlan_stddev_samp_order_by,
  "sum": GroupPlan_sum_order_by,
  "var_pop": GroupPlan_var_pop_order_by,
  "var_samp": GroupPlan_var_samp_order_by,
  "variance": GroupPlan_variance_order_by
}
Types
GroupPlan_avg_order_by
Description
order by avg() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_bool_exp
Description
Boolean expression to filter rows from the table "GroupPlan". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DiscountsPerUser - Discount_bool_exp	
GroupSet - GroupSet_bool_exp	
SellingPlan - SellingPlan_bool_exp	
_and - [GroupPlan_bool_exp!]	
_not - GroupPlan_bool_exp	
_or - [GroupPlan_bool_exp!]	
createdAt - timestamptz_comparison_exp	
groupSetId - uuid_comparison_exp	
id - uuid_comparison_exp	
maxUsers - Int_comparison_exp	
minUsers - Int_comparison_exp	
sellingPlanId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "DiscountsPerUser": Discount_bool_exp,
  "GroupSet": GroupSet_bool_exp,
  "SellingPlan": SellingPlan_bool_exp,
  "_and": [GroupPlan_bool_exp],
  "_not": GroupPlan_bool_exp,
  "_or": [GroupPlan_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "groupSetId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "maxUsers": Int_comparison_exp,
  "minUsers": Int_comparison_exp,
  "sellingPlanId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
GroupPlan_max_order_by
Description
order by max() on columns of table "GroupPlan"

Fields
Input Field	Description
createdAt - order_by	
groupSetId - order_by	
id - order_by	
maxUsers - order_by	
minUsers - order_by	
sellingPlanId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupSetId": "asc",
  "id": "asc",
  "maxUsers": "asc",
  "minUsers": "asc",
  "sellingPlanId": "asc",
  "updatedAt": "asc"
}
Types
GroupPlan_min_order_by
Description
order by min() on columns of table "GroupPlan"

Fields
Input Field	Description
createdAt - order_by	
groupSetId - order_by	
id - order_by	
maxUsers - order_by	
minUsers - order_by	
sellingPlanId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupSetId": "asc",
  "id": "asc",
  "maxUsers": "asc",
  "minUsers": "asc",
  "sellingPlanId": "asc",
  "updatedAt": "asc"
}
Types
GroupPlan_stddev_order_by
Description
order by stddev() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_sum_order_by
Description
order by sum() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_var_pop_order_by
Description
order by var_pop() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_var_samp_order_by
Description
order by var_samp() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupPlan_variance_order_by
Description
order by variance() on columns of table "GroupPlan"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
GroupSet
Description
columns and relationships of "GroupSet"

Fields
Field Name	Description
GroupPlans - [GroupPlan!]!	An array relationship
Groups - [Group!]!	An array relationship
Site - Site!	An object relationship
createdAt - timestamptz!	
id - uuid!	
name - String!	
siteId - uuid!	
updatedAt - timestamptz!	
Example
{
  "GroupPlans": [GroupPlan],
  "Groups": [Group],
  "Site": Site,
  "createdAt": timestamptz,
  "id": uuid,
  "name": "abc123",
  "siteId": uuid,
  "updatedAt": timestamptz
}
Types
GroupSet_bool_exp
Description
Boolean expression to filter rows from the table "GroupSet". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
GroupPlans - GroupPlan_bool_exp	
Groups - Group_bool_exp	
Site - Site_bool_exp	
_and - [GroupSet_bool_exp!]	
_not - GroupSet_bool_exp	
_or - [GroupSet_bool_exp!]	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
name - String_comparison_exp	
siteId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "GroupPlans": GroupPlan_bool_exp,
  "Groups": Group_bool_exp,
  "Site": Site_bool_exp,
  "_and": [GroupSet_bool_exp],
  "_not": GroupSet_bool_exp,
  "_or": [GroupSet_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "name": String_comparison_exp,
  "siteId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
GroupSet_order_by
Description
Ordering options when selecting data from "GroupSet".

Fields
Input Field	Description
GroupPlans_aggregate - GroupPlan_aggregate_order_by	
Groups_aggregate - Group_aggregate_order_by	
Site - Site_order_by	
createdAt - order_by	
id - order_by	
name - order_by	
siteId - order_by	
updatedAt - order_by	
Example
{
  "GroupPlans_aggregate": GroupPlan_aggregate_order_by,
  "Groups_aggregate": Group_aggregate_order_by,
  "Site": Site_order_by,
  "createdAt": "asc",
  "id": "asc",
  "name": "asc",
  "siteId": "asc",
  "updatedAt": "asc"
}
Types
Group_aggregate_order_by
Description
order by aggregate values of table "Group"

Fields
Input Field	Description
avg - Group_avg_order_by	
count - order_by	
max - Group_max_order_by	
min - Group_min_order_by	
stddev - Group_stddev_order_by	
stddev_pop - Group_stddev_pop_order_by	
stddev_samp - Group_stddev_samp_order_by	
sum - Group_sum_order_by	
var_pop - Group_var_pop_order_by	
var_samp - Group_var_samp_order_by	
variance - Group_variance_order_by	
Example
{
  "avg": Group_avg_order_by,
  "count": "asc",
  "max": Group_max_order_by,
  "min": Group_min_order_by,
  "stddev": Group_stddev_order_by,
  "stddev_pop": Group_stddev_pop_order_by,
  "stddev_samp": Group_stddev_samp_order_by,
  "sum": Group_sum_order_by,
  "var_pop": Group_var_pop_order_by,
  "var_samp": Group_var_samp_order_by,
  "variance": Group_variance_order_by
}
Types
Group_avg_order_by
Description
order by avg() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_bool_exp
Description
Boolean expression to filter rows from the table "Group". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DiscountsPerUser - Discount_bool_exp	
GroupSet - GroupSet_bool_exp	
OrderLineItemsIfFirstOrder - OrderLineItem_bool_exp	
SubscriptionLines - SubscriptionLine_bool_exp	
_and - [Group_bool_exp!]	
_not - Group_bool_exp	
_or - [Group_bool_exp!]	
createdAt - timestamptz_comparison_exp	
groupSetId - uuid_comparison_exp	
id - uuid_comparison_exp	
maxUsers - Int_comparison_exp	
minUsers - Int_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "DiscountsPerUser": Discount_bool_exp,
  "GroupSet": GroupSet_bool_exp,
  "OrderLineItemsIfFirstOrder": OrderLineItem_bool_exp,
  "SubscriptionLines": SubscriptionLine_bool_exp,
  "_and": [Group_bool_exp],
  "_not": Group_bool_exp,
  "_or": [Group_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "groupSetId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "maxUsers": Int_comparison_exp,
  "minUsers": Int_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Group_max_order_by
Description
order by max() on columns of table "Group"

Fields
Input Field	Description
createdAt - order_by	
groupSetId - order_by	
id - order_by	
maxUsers - order_by	
minUsers - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupSetId": "asc",
  "id": "asc",
  "maxUsers": "asc",
  "minUsers": "asc",
  "updatedAt": "asc"
}
Types
Group_min_order_by
Description
order by min() on columns of table "Group"

Fields
Input Field	Description
createdAt - order_by	
groupSetId - order_by	
id - order_by	
maxUsers - order_by	
minUsers - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupSetId": "asc",
  "id": "asc",
  "maxUsers": "asc",
  "minUsers": "asc",
  "updatedAt": "asc"
}
Types
Group_order_by
Description
Ordering options when selecting data from "Group".

Fields
Input Field	Description
DiscountsPerUser_aggregate - Discount_aggregate_order_by	
GroupSet - GroupSet_order_by	
OrderLineItemsIfFirstOrder_aggregate - OrderLineItem_aggregate_order_by	
SubscriptionLines_aggregate - SubscriptionLine_aggregate_order_by	
createdAt - order_by	
groupSetId - order_by	
id - order_by	
maxUsers - order_by	
minUsers - order_by	
updatedAt - order_by	
Example
{
  "DiscountsPerUser_aggregate": Discount_aggregate_order_by,
  "GroupSet": GroupSet_order_by,
  "OrderLineItemsIfFirstOrder_aggregate": OrderLineItem_aggregate_order_by,
  "SubscriptionLines_aggregate": SubscriptionLine_aggregate_order_by,
  "createdAt": "asc",
  "groupSetId": "asc",
  "id": "asc",
  "maxUsers": "asc",
  "minUsers": "asc",
  "updatedAt": "asc"
}
Types
Group_stddev_order_by
Description
order by stddev() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_sum_order_by
Description
order by sum() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_var_pop_order_by
Description
order by var_pop() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_var_samp_order_by
Description
order by var_samp() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Group_variance_order_by
Description
order by variance() on columns of table "Group"

Fields
Input Field	Description
maxUsers - order_by	
minUsers - order_by	
Example
{"maxUsers": "asc", "minUsers": "asc"}
Types
Holiday
Description
columns and relationships of "Holiday"

Fields
Field Name	Description
Site - Site!	An object relationship
id - uuid!	
Example
{"Site": Site, "id": uuid}
Types
Holiday_aggregate_order_by
Description
order by aggregate values of table "Holiday"

Fields
Input Field	Description
count - order_by	
max - Holiday_max_order_by	
min - Holiday_min_order_by	
Example
{
  "count": "asc",
  "max": Holiday_max_order_by,
  "min": Holiday_min_order_by
}
Types
Holiday_bool_exp
Description
Boolean expression to filter rows from the table "Holiday". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Site - Site_bool_exp	
_and - [Holiday_bool_exp!]	
_not - Holiday_bool_exp	
_or - [Holiday_bool_exp!]	
id - uuid_comparison_exp	
Example
{
  "Site": Site_bool_exp,
  "_and": [Holiday_bool_exp],
  "_not": Holiday_bool_exp,
  "_or": [Holiday_bool_exp],
  "id": uuid_comparison_exp
}
Types
Holiday_max_order_by
Description
order by max() on columns of table "Holiday"

Fields
Input Field	Description
id - order_by	
Example
{"id": "asc"}
Types
Holiday_min_order_by
Description
order by min() on columns of table "Holiday"

Fields
Input Field	Description
id - order_by	
Example
{"id": "asc"}
Types
Int
Example
123
Types
Int_comparison_exp
Description
Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - Int	
_gt - Int	
_gte - Int	
_in - [Int!]	
_is_null - Boolean	
_lt - Int	
_lte - Int	
_neq - Int	
_nin - [Int!]	
Example
{
  "_eq": 123,
  "_gt": 987,
  "_gte": 987,
  "_in": [123],
  "_is_null": true,
  "_lt": 987,
  "_lte": 123,
  "_neq": 123,
  "_nin": [123]
}
Types
Notification
Description
columns and relationships of "Notification"

Fields
Field Name	Description
NotificationLogs - [NotificationLog!]!	An array relationship
Site - Site!	An object relationship
id - uuid!	
Example
{
  "NotificationLogs": [NotificationLog],
  "Site": Site,
  "id": uuid
}
Types
NotificationLog
Description
columns and relationships of "NotificationLog"

Fields
Field Name	Description
Notification - Notification!	An object relationship
Subscription - Subscription	An object relationship
body - String	
createdAt - timestamptz!	
email - String	
id - uuid!	
notificationId - uuid!	
phoneNumber - String	
subject - String	
subscriptionId - uuid	
updatedAt - timestamptz!	
Example
{
  "Notification": Notification,
  "Subscription": Subscription,
  "body": "abc123",
  "createdAt": timestamptz,
  "email": "xyz789",
  "id": uuid,
  "notificationId": uuid,
  "phoneNumber": "xyz789",
  "subject": "xyz789",
  "subscriptionId": uuid,
  "updatedAt": timestamptz
}
Types
NotificationLog_aggregate_order_by
Description
order by aggregate values of table "NotificationLog"

Fields
Input Field	Description
count - order_by	
max - NotificationLog_max_order_by	
min - NotificationLog_min_order_by	
Example
{
  "count": "asc",
  "max": NotificationLog_max_order_by,
  "min": NotificationLog_min_order_by
}
Types
NotificationLog_bool_exp
Description
Boolean expression to filter rows from the table "NotificationLog". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Notification - Notification_bool_exp	
Subscription - Subscription_bool_exp	
_and - [NotificationLog_bool_exp!]	
_not - NotificationLog_bool_exp	
_or - [NotificationLog_bool_exp!]	
body - String_comparison_exp	
createdAt - timestamptz_comparison_exp	
email - String_comparison_exp	
id - uuid_comparison_exp	
notificationId - uuid_comparison_exp	
phoneNumber - String_comparison_exp	
subject - String_comparison_exp	
subscriptionId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Notification": Notification_bool_exp,
  "Subscription": Subscription_bool_exp,
  "_and": [NotificationLog_bool_exp],
  "_not": NotificationLog_bool_exp,
  "_or": [NotificationLog_bool_exp],
  "body": String_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "email": String_comparison_exp,
  "id": uuid_comparison_exp,
  "notificationId": uuid_comparison_exp,
  "phoneNumber": String_comparison_exp,
  "subject": String_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
NotificationLog_max_order_by
Description
order by max() on columns of table "NotificationLog"

Fields
Input Field	Description
body - order_by	
createdAt - order_by	
email - order_by	
id - order_by	
notificationId - order_by	
phoneNumber - order_by	
subject - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "body": "asc",
  "createdAt": "asc",
  "email": "asc",
  "id": "asc",
  "notificationId": "asc",
  "phoneNumber": "asc",
  "subject": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
NotificationLog_min_order_by
Description
order by min() on columns of table "NotificationLog"

Fields
Input Field	Description
body - order_by	
createdAt - order_by	
email - order_by	
id - order_by	
notificationId - order_by	
phoneNumber - order_by	
subject - order_by	
subscriptionId - order_by	
updatedAt - order_by	
Example
{
  "body": "asc",
  "createdAt": "asc",
  "email": "asc",
  "id": "asc",
  "notificationId": "asc",
  "phoneNumber": "asc",
  "subject": "asc",
  "subscriptionId": "asc",
  "updatedAt": "asc"
}
Types
Notification_aggregate_order_by
Description
order by aggregate values of table "Notification"

Fields
Input Field	Description
count - order_by	
max - Notification_max_order_by	
min - Notification_min_order_by	
Example
{
  "count": "asc",
  "max": Notification_max_order_by,
  "min": Notification_min_order_by
}
Types
Notification_bool_exp
Description
Boolean expression to filter rows from the table "Notification". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
NotificationLogs - NotificationLog_bool_exp	
Site - Site_bool_exp	
_and - [Notification_bool_exp!]	
_not - Notification_bool_exp	
_or - [Notification_bool_exp!]	
id - uuid_comparison_exp	
Example
{
  "NotificationLogs": NotificationLog_bool_exp,
  "Site": Site_bool_exp,
  "_and": [Notification_bool_exp],
  "_not": Notification_bool_exp,
  "_or": [Notification_bool_exp],
  "id": uuid_comparison_exp
}
Types
Notification_max_order_by
Description
order by max() on columns of table "Notification"

Fields
Input Field	Description
id - order_by	
Example
{"id": "asc"}
Types
Notification_min_order_by
Description
order by min() on columns of table "Notification"

Fields
Input Field	Description
id - order_by	
Example
{"id": "asc"}
Types
Order
Description
UNIQUE FIELDS WILL NOT WORK WELL WITH DELETEDAT

Fields
Field Name	Description
OrderLineItems - [OrderLineItem!]!	An array relationship
PrepaidSubscription - Subscription	An object relationship
ShippingLines - [ShippingLine!]!	An array relationship
Site - Site	An object relationship
StorefrontUser - StorefrontUser!	An object relationship
appId - String	
cancelledAt - timestamptz	
clientIp - String	
createdAt - timestamptz!	
deletedAt - timestamptz	
deliveredAt - timestamptz	
id - uuid!	
note - String	
platformId - String	
platformNumber - String!	
processedAt - timestamptz	
siteId - uuid!	
storefrontUserId - uuid!	
totalPrice - Float	
updatedAt - timestamp!	
Example
{
  "OrderLineItems": [OrderLineItem],
  "PrepaidSubscription": Subscription,
  "ShippingLines": [ShippingLine],
  "Site": Site,
  "StorefrontUser": StorefrontUser,
  "appId": "abc123",
  "cancelledAt": timestamptz,
  "clientIp": "xyz789",
  "createdAt": timestamptz,
  "deletedAt": timestamptz,
  "deliveredAt": timestamptz,
  "id": uuid,
  "note": "xyz789",
  "platformId": "abc123",
  "platformNumber": "abc123",
  "processedAt": timestamptz,
  "siteId": uuid,
  "storefrontUserId": uuid,
  "totalPrice": 123.45,
  "updatedAt": timestamp
}
Types
OrderLineItem
Description
groupId is only defined on initial order

Fields
Field Name	Description
Discounts - [Discount!]!	An array relationship
GroupIfInitialOrder - Group	An object relationship
Order - Order!	An object relationship
ProductVariant - ProductVariant!	An object relationship
SubscriptionLine - SubscriptionLine	An object relationship
TaxLines - [TaxLine!]!	An array relationship
attributionGroupId - uuid	
createdAt - timestamptz!	
customAttributes - jsonb	
groupId - uuid	
id - uuid!	
orderId - uuid!	
platformId - String	
priceWithoutDiscount - numeric!	this is in units of the Site's currencyCode
productVariantId - uuid!	
quantity - Int!	
subscriptionLineId - uuid	
updatedAt - timestamptz!	
Example
{
  "Discounts": [Discount],
  "GroupIfInitialOrder": Group,
  "Order": Order,
  "ProductVariant": ProductVariant,
  "SubscriptionLine": SubscriptionLine,
  "TaxLines": [TaxLine],
  "attributionGroupId": uuid,
  "createdAt": timestamptz,
  "customAttributes": jsonb,
  "groupId": uuid,
  "id": uuid,
  "orderId": uuid,
  "platformId": "abc123",
  "priceWithoutDiscount": numeric,
  "productVariantId": uuid,
  "quantity": 123,
  "subscriptionLineId": uuid,
  "updatedAt": timestamptz
}
Types
OrderLineItem_aggregate_order_by
Description
order by aggregate values of table "OrderLineItem"

Fields
Input Field	Description
avg - OrderLineItem_avg_order_by	
count - order_by	
max - OrderLineItem_max_order_by	
min - OrderLineItem_min_order_by	
stddev - OrderLineItem_stddev_order_by	
stddev_pop - OrderLineItem_stddev_pop_order_by	
stddev_samp - OrderLineItem_stddev_samp_order_by	
sum - OrderLineItem_sum_order_by	
var_pop - OrderLineItem_var_pop_order_by	
var_samp - OrderLineItem_var_samp_order_by	
variance - OrderLineItem_variance_order_by	
Example
{
  "avg": OrderLineItem_avg_order_by,
  "count": "asc",
  "max": OrderLineItem_max_order_by,
  "min": OrderLineItem_min_order_by,
  "stddev": OrderLineItem_stddev_order_by,
  "stddev_pop": OrderLineItem_stddev_pop_order_by,
  "stddev_samp": OrderLineItem_stddev_samp_order_by,
  "sum": OrderLineItem_sum_order_by,
  "var_pop": OrderLineItem_var_pop_order_by,
  "var_samp": OrderLineItem_var_samp_order_by,
  "variance": OrderLineItem_variance_order_by
}
Types
OrderLineItem_avg_order_by
Description
order by avg() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_bool_exp
Description
Boolean expression to filter rows from the table "OrderLineItem". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Discounts - Discount_bool_exp	
GroupIfInitialOrder - Group_bool_exp	
Order - Order_bool_exp	
ProductVariant - ProductVariant_bool_exp	
SubscriptionLine - SubscriptionLine_bool_exp	
TaxLines - TaxLine_bool_exp	
_and - [OrderLineItem_bool_exp!]	
_not - OrderLineItem_bool_exp	
_or - [OrderLineItem_bool_exp!]	
attributionGroupId - uuid_comparison_exp	
createdAt - timestamptz_comparison_exp	
customAttributes - jsonb_comparison_exp	
groupId - uuid_comparison_exp	
id - uuid_comparison_exp	
orderId - uuid_comparison_exp	
platformId - String_comparison_exp	
priceWithoutDiscount - numeric_comparison_exp	
productVariantId - uuid_comparison_exp	
quantity - Int_comparison_exp	
subscriptionLineId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Discounts": Discount_bool_exp,
  "GroupIfInitialOrder": Group_bool_exp,
  "Order": Order_bool_exp,
  "ProductVariant": ProductVariant_bool_exp,
  "SubscriptionLine": SubscriptionLine_bool_exp,
  "TaxLines": TaxLine_bool_exp,
  "_and": [OrderLineItem_bool_exp],
  "_not": OrderLineItem_bool_exp,
  "_or": [OrderLineItem_bool_exp],
  "attributionGroupId": uuid_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "customAttributes": jsonb_comparison_exp,
  "groupId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "orderId": uuid_comparison_exp,
  "platformId": String_comparison_exp,
  "priceWithoutDiscount": numeric_comparison_exp,
  "productVariantId": uuid_comparison_exp,
  "quantity": Int_comparison_exp,
  "subscriptionLineId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
OrderLineItem_max_order_by
Description
order by max() on columns of table "OrderLineItem"

Fields
Input Field	Description
attributionGroupId - order_by	
createdAt - order_by	
groupId - order_by	
id - order_by	
orderId - order_by	
platformId - order_by	
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
productVariantId - order_by	
quantity - order_by	
subscriptionLineId - order_by	
updatedAt - order_by	
Example
{
  "attributionGroupId": "asc",
  "createdAt": "asc",
  "groupId": "asc",
  "id": "asc",
  "orderId": "asc",
  "platformId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "subscriptionLineId": "asc",
  "updatedAt": "asc"
}
Types
OrderLineItem_min_order_by
Description
order by min() on columns of table "OrderLineItem"

Fields
Input Field	Description
attributionGroupId - order_by	
createdAt - order_by	
groupId - order_by	
id - order_by	
orderId - order_by	
platformId - order_by	
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
productVariantId - order_by	
quantity - order_by	
subscriptionLineId - order_by	
updatedAt - order_by	
Example
{
  "attributionGroupId": "asc",
  "createdAt": "asc",
  "groupId": "asc",
  "id": "asc",
  "orderId": "asc",
  "platformId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "subscriptionLineId": "asc",
  "updatedAt": "asc"
}
Types
OrderLineItem_order_by
Description
Ordering options when selecting data from "OrderLineItem".

Fields
Input Field	Description
Discounts_aggregate - Discount_aggregate_order_by	
GroupIfInitialOrder - Group_order_by	
Order - Order_order_by	
ProductVariant - ProductVariant_order_by	
SubscriptionLine - SubscriptionLine_order_by	
TaxLines_aggregate - TaxLine_aggregate_order_by	
attributionGroupId - order_by	
createdAt - order_by	
customAttributes - order_by	
groupId - order_by	
id - order_by	
orderId - order_by	
platformId - order_by	
priceWithoutDiscount - order_by	
productVariantId - order_by	
quantity - order_by	
subscriptionLineId - order_by	
updatedAt - order_by	
Example
{
  "Discounts_aggregate": Discount_aggregate_order_by,
  "GroupIfInitialOrder": Group_order_by,
  "Order": Order_order_by,
  "ProductVariant": ProductVariant_order_by,
  "SubscriptionLine": SubscriptionLine_order_by,
  "TaxLines_aggregate": TaxLine_aggregate_order_by,
  "attributionGroupId": "asc",
  "createdAt": "asc",
  "customAttributes": "asc",
  "groupId": "asc",
  "id": "asc",
  "orderId": "asc",
  "platformId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "subscriptionLineId": "asc",
  "updatedAt": "asc"
}
Types
OrderLineItem_select_column
Description
select columns of table "OrderLineItem"

Values
Enum Value	Description
attributionGroupId

column name
createdAt

column name
customAttributes

column name
groupId

column name
id

column name
orderId

column name
platformId

column name
priceWithoutDiscount

column name
productVariantId

column name
quantity

column name
subscriptionLineId

column name
updatedAt

column name
Example
"attributionGroupId"
Types
OrderLineItem_stddev_order_by
Description
order by stddev() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_sum_order_by
Description
order by sum() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_var_pop_order_by
Description
order by var_pop() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_var_samp_order_by
Description
order by var_samp() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
OrderLineItem_variance_order_by
Description
order by variance() on columns of table "OrderLineItem"

Fields
Input Field	Description
priceWithoutDiscount - order_by	this is in units of the Site's currencyCode
quantity - order_by	
Example
{"priceWithoutDiscount": "asc", "quantity": "asc"}
Types
Order_aggregate_order_by
Description
order by aggregate values of table "Order"

Fields
Input Field	Description
avg - Order_avg_order_by	
count - order_by	
max - Order_max_order_by	
min - Order_min_order_by	
stddev - Order_stddev_order_by	
stddev_pop - Order_stddev_pop_order_by	
stddev_samp - Order_stddev_samp_order_by	
sum - Order_sum_order_by	
var_pop - Order_var_pop_order_by	
var_samp - Order_var_samp_order_by	
variance - Order_variance_order_by	
Example
{
  "avg": Order_avg_order_by,
  "count": "asc",
  "max": Order_max_order_by,
  "min": Order_min_order_by,
  "stddev": Order_stddev_order_by,
  "stddev_pop": Order_stddev_pop_order_by,
  "stddev_samp": Order_stddev_samp_order_by,
  "sum": Order_sum_order_by,
  "var_pop": Order_var_pop_order_by,
  "var_samp": Order_var_samp_order_by,
  "variance": Order_variance_order_by
}
Types
Order_avg_order_by
Description
order by avg() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_bool_exp
Description
Boolean expression to filter rows from the table "Order". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
OrderLineItems - OrderLineItem_bool_exp	
PrepaidSubscription - Subscription_bool_exp	
ShippingLines - ShippingLine_bool_exp	
Site - Site_bool_exp	
StorefrontUser - StorefrontUser_bool_exp	
_and - [Order_bool_exp!]	
_not - Order_bool_exp	
_or - [Order_bool_exp!]	
appId - String_comparison_exp	
cancelledAt - timestamptz_comparison_exp	
clientIp - String_comparison_exp	
createdAt - timestamptz_comparison_exp	
deletedAt - timestamptz_comparison_exp	
deliveredAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
note - String_comparison_exp	
platformId - String_comparison_exp	
platformNumber - String_comparison_exp	
processedAt - timestamptz_comparison_exp	
siteId - uuid_comparison_exp	
storefrontUserId - uuid_comparison_exp	
totalPrice - Float_comparison_exp	
updatedAt - timestamp_comparison_exp	
Example
{
  "OrderLineItems": OrderLineItem_bool_exp,
  "PrepaidSubscription": Subscription_bool_exp,
  "ShippingLines": ShippingLine_bool_exp,
  "Site": Site_bool_exp,
  "StorefrontUser": StorefrontUser_bool_exp,
  "_and": [Order_bool_exp],
  "_not": Order_bool_exp,
  "_or": [Order_bool_exp],
  "appId": String_comparison_exp,
  "cancelledAt": timestamptz_comparison_exp,
  "clientIp": String_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "deletedAt": timestamptz_comparison_exp,
  "deliveredAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "note": String_comparison_exp,
  "platformId": String_comparison_exp,
  "platformNumber": String_comparison_exp,
  "processedAt": timestamptz_comparison_exp,
  "siteId": uuid_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "totalPrice": Float_comparison_exp,
  "updatedAt": timestamp_comparison_exp
}
Types
Order_max_order_by
Description
order by max() on columns of table "Order"

Fields
Input Field	Description
appId - order_by	
cancelledAt - order_by	
clientIp - order_by	
createdAt - order_by	
deletedAt - order_by	
deliveredAt - order_by	
id - order_by	
note - order_by	
platformId - order_by	
platformNumber - order_by	
processedAt - order_by	
siteId - order_by	
storefrontUserId - order_by	
totalPrice - order_by	
updatedAt - order_by	
Example
{
  "appId": "asc",
  "cancelledAt": "asc",
  "clientIp": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "deliveredAt": "asc",
  "id": "asc",
  "note": "asc",
  "platformId": "asc",
  "platformNumber": "asc",
  "processedAt": "asc",
  "siteId": "asc",
  "storefrontUserId": "asc",
  "totalPrice": "asc",
  "updatedAt": "asc"
}
Types
Order_min_order_by
Description
order by min() on columns of table "Order"

Fields
Input Field	Description
appId - order_by	
cancelledAt - order_by	
clientIp - order_by	
createdAt - order_by	
deletedAt - order_by	
deliveredAt - order_by	
id - order_by	
note - order_by	
platformId - order_by	
platformNumber - order_by	
processedAt - order_by	
siteId - order_by	
storefrontUserId - order_by	
totalPrice - order_by	
updatedAt - order_by	
Example
{
  "appId": "asc",
  "cancelledAt": "asc",
  "clientIp": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "deliveredAt": "asc",
  "id": "asc",
  "note": "asc",
  "platformId": "asc",
  "platformNumber": "asc",
  "processedAt": "asc",
  "siteId": "asc",
  "storefrontUserId": "asc",
  "totalPrice": "asc",
  "updatedAt": "asc"
}
Types
Order_order_by
Description
Ordering options when selecting data from "Order".

Fields
Input Field	Description
OrderLineItems_aggregate - OrderLineItem_aggregate_order_by	
PrepaidSubscription - Subscription_order_by	
ShippingLines_aggregate - ShippingLine_aggregate_order_by	
Site - Site_order_by	
StorefrontUser - StorefrontUser_order_by	
appId - order_by	
cancelledAt - order_by	
clientIp - order_by	
createdAt - order_by	
deletedAt - order_by	
deliveredAt - order_by	
id - order_by	
note - order_by	
platformId - order_by	
platformNumber - order_by	
processedAt - order_by	
siteId - order_by	
storefrontUserId - order_by	
totalPrice - order_by	
updatedAt - order_by	
Example
{
  "OrderLineItems_aggregate": OrderLineItem_aggregate_order_by,
  "PrepaidSubscription": Subscription_order_by,
  "ShippingLines_aggregate": ShippingLine_aggregate_order_by,
  "Site": Site_order_by,
  "StorefrontUser": StorefrontUser_order_by,
  "appId": "asc",
  "cancelledAt": "asc",
  "clientIp": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "deliveredAt": "asc",
  "id": "asc",
  "note": "asc",
  "platformId": "asc",
  "platformNumber": "asc",
  "processedAt": "asc",
  "siteId": "asc",
  "storefrontUserId": "asc",
  "totalPrice": "asc",
  "updatedAt": "asc"
}
Types
Order_select_column
Description
select columns of table "Order"

Values
Enum Value	Description
appId

column name
cancelledAt

column name
clientIp

column name
createdAt

column name
deletedAt

column name
deliveredAt

column name
id

column name
note

column name
platformId

column name
platformNumber

column name
processedAt

column name
siteId

column name
storefrontUserId

column name
totalPrice

column name
updatedAt

column name
Example
"appId"
Types
Order_stddev_order_by
Description
order by stddev() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_sum_order_by
Description
order by sum() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_var_pop_order_by
Description
order by var_pop() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_var_samp_order_by
Description
order by var_samp() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
Order_variance_order_by
Description
order by variance() on columns of table "Order"

Fields
Input Field	Description
totalPrice - order_by	
Example
{"totalPrice": "asc"}
Types
PaymentMethod
Description
columns and relationships of "PaymentMethod"

Fields
Field Name	Description
BillingAddress - Address	An object relationship
StorefrontUser - StorefrontUser!	An object relationship
Subscriptions - [Subscription!]!	An array relationship
billingAddressId - uuid	
brand - String	
createdAt - timestamptz!	
expiryMonth - numeric	
expiryYear - numeric	
id - uuid!	
inactive - Boolean	
instrumentType - String	
lastDigits - numeric	
paypalAccountEmail - String	
platformId - String!	
revokedAt - timestamptz	
skioRevoke - Boolean	
storefrontUserId - uuid!	
updatedAt - timestamptz!	
Example
{
  "BillingAddress": Address,
  "StorefrontUser": StorefrontUser,
  "Subscriptions": [Subscription],
  "billingAddressId": uuid,
  "brand": "abc123",
  "createdAt": timestamptz,
  "expiryMonth": numeric,
  "expiryYear": numeric,
  "id": uuid,
  "inactive": false,
  "instrumentType": "abc123",
  "lastDigits": numeric,
  "paypalAccountEmail": "abc123",
  "platformId": "abc123",
  "revokedAt": timestamptz,
  "skioRevoke": true,
  "storefrontUserId": uuid,
  "updatedAt": timestamptz
}
Types
PaymentMethod_aggregate_order_by
Description
order by aggregate values of table "PaymentMethod"

Fields
Input Field	Description
avg - PaymentMethod_avg_order_by	
count - order_by	
max - PaymentMethod_max_order_by	
min - PaymentMethod_min_order_by	
stddev - PaymentMethod_stddev_order_by	
stddev_pop - PaymentMethod_stddev_pop_order_by	
stddev_samp - PaymentMethod_stddev_samp_order_by	
sum - PaymentMethod_sum_order_by	
var_pop - PaymentMethod_var_pop_order_by	
var_samp - PaymentMethod_var_samp_order_by	
variance - PaymentMethod_variance_order_by	
Example
{
  "avg": PaymentMethod_avg_order_by,
  "count": "asc",
  "max": PaymentMethod_max_order_by,
  "min": PaymentMethod_min_order_by,
  "stddev": PaymentMethod_stddev_order_by,
  "stddev_pop": PaymentMethod_stddev_pop_order_by,
  "stddev_samp": PaymentMethod_stddev_samp_order_by,
  "sum": PaymentMethod_sum_order_by,
  "var_pop": PaymentMethod_var_pop_order_by,
  "var_samp": PaymentMethod_var_samp_order_by,
  "variance": PaymentMethod_variance_order_by
}
Types
PaymentMethod_avg_order_by
Description
order by avg() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_bool_exp
Description
Boolean expression to filter rows from the table "PaymentMethod". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
BillingAddress - Address_bool_exp	
StorefrontUser - StorefrontUser_bool_exp	
Subscriptions - Subscription_bool_exp	
_and - [PaymentMethod_bool_exp!]	
_not - PaymentMethod_bool_exp	
_or - [PaymentMethod_bool_exp!]	
billingAddressId - uuid_comparison_exp	
brand - String_comparison_exp	
createdAt - timestamptz_comparison_exp	
expiryMonth - numeric_comparison_exp	
expiryYear - numeric_comparison_exp	
id - uuid_comparison_exp	
inactive - Boolean_comparison_exp	
instrumentType - String_comparison_exp	
lastDigits - numeric_comparison_exp	
paypalAccountEmail - String_comparison_exp	
platformId - String_comparison_exp	
revokedAt - timestamptz_comparison_exp	
skioRevoke - Boolean_comparison_exp	
storefrontUserId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "BillingAddress": Address_bool_exp,
  "StorefrontUser": StorefrontUser_bool_exp,
  "Subscriptions": Subscription_bool_exp,
  "_and": [PaymentMethod_bool_exp],
  "_not": PaymentMethod_bool_exp,
  "_or": [PaymentMethod_bool_exp],
  "billingAddressId": uuid_comparison_exp,
  "brand": String_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "expiryMonth": numeric_comparison_exp,
  "expiryYear": numeric_comparison_exp,
  "id": uuid_comparison_exp,
  "inactive": Boolean_comparison_exp,
  "instrumentType": String_comparison_exp,
  "lastDigits": numeric_comparison_exp,
  "paypalAccountEmail": String_comparison_exp,
  "platformId": String_comparison_exp,
  "revokedAt": timestamptz_comparison_exp,
  "skioRevoke": Boolean_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
PaymentMethod_max_order_by
Description
order by max() on columns of table "PaymentMethod"

Fields
Input Field	Description
billingAddressId - order_by	
brand - order_by	
createdAt - order_by	
expiryMonth - order_by	
expiryYear - order_by	
id - order_by	
instrumentType - order_by	
lastDigits - order_by	
paypalAccountEmail - order_by	
platformId - order_by	
revokedAt - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "billingAddressId": "asc",
  "brand": "asc",
  "createdAt": "asc",
  "expiryMonth": "asc",
  "expiryYear": "asc",
  "id": "asc",
  "instrumentType": "asc",
  "lastDigits": "asc",
  "paypalAccountEmail": "asc",
  "platformId": "asc",
  "revokedAt": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
PaymentMethod_min_order_by
Description
order by min() on columns of table "PaymentMethod"

Fields
Input Field	Description
billingAddressId - order_by	
brand - order_by	
createdAt - order_by	
expiryMonth - order_by	
expiryYear - order_by	
id - order_by	
instrumentType - order_by	
lastDigits - order_by	
paypalAccountEmail - order_by	
platformId - order_by	
revokedAt - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "billingAddressId": "asc",
  "brand": "asc",
  "createdAt": "asc",
  "expiryMonth": "asc",
  "expiryYear": "asc",
  "id": "asc",
  "instrumentType": "asc",
  "lastDigits": "asc",
  "paypalAccountEmail": "asc",
  "platformId": "asc",
  "revokedAt": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
PaymentMethod_order_by
Description
Ordering options when selecting data from "PaymentMethod".

Fields
Input Field	Description
BillingAddress - Address_order_by	
StorefrontUser - StorefrontUser_order_by	
Subscriptions_aggregate - Subscription_aggregate_order_by	
billingAddressId - order_by	
brand - order_by	
createdAt - order_by	
expiryMonth - order_by	
expiryYear - order_by	
id - order_by	
inactive - order_by	
instrumentType - order_by	
lastDigits - order_by	
paypalAccountEmail - order_by	
platformId - order_by	
revokedAt - order_by	
skioRevoke - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "BillingAddress": Address_order_by,
  "StorefrontUser": StorefrontUser_order_by,
  "Subscriptions_aggregate": Subscription_aggregate_order_by,
  "billingAddressId": "asc",
  "brand": "asc",
  "createdAt": "asc",
  "expiryMonth": "asc",
  "expiryYear": "asc",
  "id": "asc",
  "inactive": "asc",
  "instrumentType": "asc",
  "lastDigits": "asc",
  "paypalAccountEmail": "asc",
  "platformId": "asc",
  "revokedAt": "asc",
  "skioRevoke": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
PaymentMethod_stddev_order_by
Description
order by stddev() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_sum_order_by
Description
order by sum() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_var_pop_order_by
Description
order by var_pop() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_var_samp_order_by
Description
order by var_samp() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
PaymentMethod_variance_order_by
Description
order by variance() on columns of table "PaymentMethod"

Fields
Input Field	Description
expiryMonth - order_by	
expiryYear - order_by	
lastDigits - order_by	
Example
{"expiryMonth": "asc", "expiryYear": "asc", "lastDigits": "asc"}
Types
Policy
Description
No check on insert so be careful adding new fields

Fields
Field Name	Description
Anchors - [Anchor!]!	An array relationship
SellingPlansByBillingPolicy - [SellingPlan!]!	An array relationship
SellingPlansByDeliveryPolicy - [SellingPlan!]!	An array relationship
SellingPlansByPrepaidDeliveryPolicy - [SellingPlan!]!	An array relationship
SubscriptionsByBillingPolicy - [Subscription!]!	An array relationship
SubscriptionsByDeliveryPolicy - [Subscription!]!	An array relationship
SubscriptionsByPrepaidDeliveryPolicy - [Subscription!]!	An array relationship
createdAt - timestamptz!	
id - uuid!	
interval - String!	
intervalCount - Int!	
isMaxCycleV2 - Boolean	
maxCycles - Int	
minCycles - Int	
updatedAt - timestamptz!	
Example
{
  "Anchors": [Anchor],
  "SellingPlansByBillingPolicy": [SellingPlan],
  "SellingPlansByDeliveryPolicy": [SellingPlan],
  "SellingPlansByPrepaidDeliveryPolicy": [SellingPlan],
  "SubscriptionsByBillingPolicy": [Subscription],
  "SubscriptionsByDeliveryPolicy": [Subscription],
  "SubscriptionsByPrepaidDeliveryPolicy": [Subscription],
  "createdAt": timestamptz,
  "id": uuid,
  "interval": "abc123",
  "intervalCount": 987,
  "isMaxCycleV2": false,
  "maxCycles": 123,
  "minCycles": 987,
  "updatedAt": timestamptz
}
Types
Policy_bool_exp
Description
Boolean expression to filter rows from the table "Policy". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Anchors - Anchor_bool_exp	
SellingPlansByBillingPolicy - SellingPlan_bool_exp	
SellingPlansByDeliveryPolicy - SellingPlan_bool_exp	
SellingPlansByPrepaidDeliveryPolicy - SellingPlan_bool_exp	
SubscriptionsByBillingPolicy - Subscription_bool_exp	
SubscriptionsByDeliveryPolicy - Subscription_bool_exp	
SubscriptionsByPrepaidDeliveryPolicy - Subscription_bool_exp	
_and - [Policy_bool_exp!]	
_not - Policy_bool_exp	
_or - [Policy_bool_exp!]	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
interval - String_comparison_exp	
intervalCount - Int_comparison_exp	
isMaxCycleV2 - Boolean_comparison_exp	
maxCycles - Int_comparison_exp	
minCycles - Int_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Anchors": Anchor_bool_exp,
  "SellingPlansByBillingPolicy": SellingPlan_bool_exp,
  "SellingPlansByDeliveryPolicy": SellingPlan_bool_exp,
  "SellingPlansByPrepaidDeliveryPolicy": SellingPlan_bool_exp,
  "SubscriptionsByBillingPolicy": Subscription_bool_exp,
  "SubscriptionsByDeliveryPolicy": Subscription_bool_exp,
  "SubscriptionsByPrepaidDeliveryPolicy": Subscription_bool_exp,
  "_and": [Policy_bool_exp],
  "_not": Policy_bool_exp,
  "_or": [Policy_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "interval": String_comparison_exp,
  "intervalCount": Int_comparison_exp,
  "isMaxCycleV2": Boolean_comparison_exp,
  "maxCycles": Int_comparison_exp,
  "minCycles": Int_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Policy_order_by
Description
Ordering options when selecting data from "Policy".

Fields
Input Field	Description
Anchors_aggregate - Anchor_aggregate_order_by	
SellingPlansByBillingPolicy_aggregate - SellingPlan_aggregate_order_by	
SellingPlansByDeliveryPolicy_aggregate - SellingPlan_aggregate_order_by	
SellingPlansByPrepaidDeliveryPolicy_aggregate - SellingPlan_aggregate_order_by	
SubscriptionsByBillingPolicy_aggregate - Subscription_aggregate_order_by	
SubscriptionsByDeliveryPolicy_aggregate - Subscription_aggregate_order_by	
SubscriptionsByPrepaidDeliveryPolicy_aggregate - Subscription_aggregate_order_by	
createdAt - order_by	
id - order_by	
interval - order_by	
intervalCount - order_by	
isMaxCycleV2 - order_by	
maxCycles - order_by	
minCycles - order_by	
updatedAt - order_by	
Example
{
  "Anchors_aggregate": Anchor_aggregate_order_by,
  "SellingPlansByBillingPolicy_aggregate": SellingPlan_aggregate_order_by,
  "SellingPlansByDeliveryPolicy_aggregate": SellingPlan_aggregate_order_by,
  "SellingPlansByPrepaidDeliveryPolicy_aggregate": SellingPlan_aggregate_order_by,
  "SubscriptionsByBillingPolicy_aggregate": Subscription_aggregate_order_by,
  "SubscriptionsByDeliveryPolicy_aggregate": Subscription_aggregate_order_by,
  "SubscriptionsByPrepaidDeliveryPolicy_aggregate": Subscription_aggregate_order_by,
  "createdAt": "asc",
  "id": "asc",
  "interval": "asc",
  "intervalCount": "asc",
  "isMaxCycleV2": "asc",
  "maxCycles": "asc",
  "minCycles": "asc",
  "updatedAt": "asc"
}
Types
Policy_select_column
Description
select columns of table "Policy"

Values
Enum Value	Description
createdAt

column name
id

column name
interval

column name
intervalCount

column name
isMaxCycleV2

column name
maxCycles

column name
minCycles

column name
updatedAt

column name
Example
"createdAt"
Types
PricingPolicy
Description
columns and relationships of "PricingPolicy"

Fields
Field Name	Description
SellingPlan - SellingPlan!	An object relationship
afterCycle - Int	
createdAt - timestamptz!	
fixedPrice - numeric	
id - uuid!	
percentageOff - numeric	
sellingPlanId - uuid!	
sellingPlanPricingPolicyAdjustmentType - String	
updatedAt - timestamptz!	
Example
{
  "SellingPlan": SellingPlan,
  "afterCycle": 987,
  "createdAt": timestamptz,
  "fixedPrice": numeric,
  "id": uuid,
  "percentageOff": numeric,
  "sellingPlanId": uuid,
  "sellingPlanPricingPolicyAdjustmentType": "abc123",
  "updatedAt": timestamptz
}
Types
PricingPolicy_aggregate_order_by
Description
order by aggregate values of table "PricingPolicy"

Fields
Input Field	Description
avg - PricingPolicy_avg_order_by	
count - order_by	
max - PricingPolicy_max_order_by	
min - PricingPolicy_min_order_by	
stddev - PricingPolicy_stddev_order_by	
stddev_pop - PricingPolicy_stddev_pop_order_by	
stddev_samp - PricingPolicy_stddev_samp_order_by	
sum - PricingPolicy_sum_order_by	
var_pop - PricingPolicy_var_pop_order_by	
var_samp - PricingPolicy_var_samp_order_by	
variance - PricingPolicy_variance_order_by	
Example
{
  "avg": PricingPolicy_avg_order_by,
  "count": "asc",
  "max": PricingPolicy_max_order_by,
  "min": PricingPolicy_min_order_by,
  "stddev": PricingPolicy_stddev_order_by,
  "stddev_pop": PricingPolicy_stddev_pop_order_by,
  "stddev_samp": PricingPolicy_stddev_samp_order_by,
  "sum": PricingPolicy_sum_order_by,
  "var_pop": PricingPolicy_var_pop_order_by,
  "var_samp": PricingPolicy_var_samp_order_by,
  "variance": PricingPolicy_variance_order_by
}
Types
PricingPolicy_avg_order_by
Description
order by avg() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_bool_exp
Description
Boolean expression to filter rows from the table "PricingPolicy". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
SellingPlan - SellingPlan_bool_exp	
_and - [PricingPolicy_bool_exp!]	
_not - PricingPolicy_bool_exp	
_or - [PricingPolicy_bool_exp!]	
afterCycle - Int_comparison_exp	
createdAt - timestamptz_comparison_exp	
fixedPrice - numeric_comparison_exp	
id - uuid_comparison_exp	
percentageOff - numeric_comparison_exp	
sellingPlanId - uuid_comparison_exp	
sellingPlanPricingPolicyAdjustmentType - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "SellingPlan": SellingPlan_bool_exp,
  "_and": [PricingPolicy_bool_exp],
  "_not": PricingPolicy_bool_exp,
  "_or": [PricingPolicy_bool_exp],
  "afterCycle": Int_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "fixedPrice": numeric_comparison_exp,
  "id": uuid_comparison_exp,
  "percentageOff": numeric_comparison_exp,
  "sellingPlanId": uuid_comparison_exp,
  "sellingPlanPricingPolicyAdjustmentType": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
PricingPolicy_max_order_by
Description
order by max() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
createdAt - order_by	
fixedPrice - order_by	
id - order_by	
percentageOff - order_by	
sellingPlanId - order_by	
sellingPlanPricingPolicyAdjustmentType - order_by	
updatedAt - order_by	
Example
{
  "afterCycle": "asc",
  "createdAt": "asc",
  "fixedPrice": "asc",
  "id": "asc",
  "percentageOff": "asc",
  "sellingPlanId": "asc",
  "sellingPlanPricingPolicyAdjustmentType": "asc",
  "updatedAt": "asc"
}
Types
PricingPolicy_min_order_by
Description
order by min() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
createdAt - order_by	
fixedPrice - order_by	
id - order_by	
percentageOff - order_by	
sellingPlanId - order_by	
sellingPlanPricingPolicyAdjustmentType - order_by	
updatedAt - order_by	
Example
{
  "afterCycle": "asc",
  "createdAt": "asc",
  "fixedPrice": "asc",
  "id": "asc",
  "percentageOff": "asc",
  "sellingPlanId": "asc",
  "sellingPlanPricingPolicyAdjustmentType": "asc",
  "updatedAt": "asc"
}
Types
PricingPolicy_order_by
Description
Ordering options when selecting data from "PricingPolicy".

Fields
Input Field	Description
SellingPlan - SellingPlan_order_by	
afterCycle - order_by	
createdAt - order_by	
fixedPrice - order_by	
id - order_by	
percentageOff - order_by	
sellingPlanId - order_by	
sellingPlanPricingPolicyAdjustmentType - order_by	
updatedAt - order_by	
Example
{
  "SellingPlan": SellingPlan_order_by,
  "afterCycle": "asc",
  "createdAt": "asc",
  "fixedPrice": "asc",
  "id": "asc",
  "percentageOff": "asc",
  "sellingPlanId": "asc",
  "sellingPlanPricingPolicyAdjustmentType": "asc",
  "updatedAt": "asc"
}
Types
PricingPolicy_select_column
Description
select columns of table "PricingPolicy"

Values
Enum Value	Description
afterCycle

column name
createdAt

column name
fixedPrice

column name
id

column name
percentageOff

column name
sellingPlanId

column name
sellingPlanPricingPolicyAdjustmentType

column name
updatedAt

column name
Example
"afterCycle"
Types
PricingPolicy_stddev_order_by
Description
order by stddev() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_sum_order_by
Description
order by sum() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_var_pop_order_by
Description
order by var_pop() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_var_samp_order_by
Description
order by var_samp() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
PricingPolicy_variance_order_by
Description
order by variance() on columns of table "PricingPolicy"

Fields
Input Field	Description
afterCycle - order_by	
fixedPrice - order_by	
percentageOff - order_by	
Example
{"afterCycle": "asc", "fixedPrice": "asc", "percentageOff": "asc"}
Types
Product
Description
UNIQUE FIELDS WILL NOT WORK WELL WITH DELETEDAT

Fields
Field Name	Description
DynamicBox - DynamicBox	An object relationship
ProductVariants - [ProductVariant!]!	An array relationship
Site - Site!	An object relationship
canUpsell - Boolean	
createdAt - timestamptz!	
deletedAt - timestamptz	
description - String	
hideOn1TimeUpsells - Boolean	
id - uuid!	
imageSrc - String	
images - jsonb	
limitOneTimeUpsellQuantity - Boolean	
metafields - jsonb	
oneTimeUpsellPercentageOff - numeric	
platformId - String!	
shopifyTags - jsonb	
siteId - uuid!	
slug - String!	
smsOrder - Int	
status - String	
title - String!	
updatedAt - timestamptz!	
Example
{
  "DynamicBox": DynamicBox,
  "ProductVariants": [ProductVariant],
  "Site": Site,
  "canUpsell": false,
  "createdAt": timestamptz,
  "deletedAt": timestamptz,
  "description": "xyz789",
  "hideOn1TimeUpsells": false,
  "id": uuid,
  "imageSrc": "abc123",
  "images": jsonb,
  "limitOneTimeUpsellQuantity": true,
  "metafields": jsonb,
  "oneTimeUpsellPercentageOff": numeric,
  "platformId": "xyz789",
  "shopifyTags": jsonb,
  "siteId": uuid,
  "slug": "abc123",
  "smsOrder": 123,
  "status": "abc123",
  "title": "abc123",
  "updatedAt": timestamptz
}
Types
ProductVariant
Description
columns and relationships of "ProductVariant"

Fields
Field Name	Description
DynamicBox_SelectableProductVariants - [DynamicBox_SelectableProductVariant!]!	An array relationship
OrderLineItems - [OrderLineItem!]!	An array relationship
Product - Product!	An object relationship
SellingPlanGroupResources - [SellingPlanGroupResource!]!	An array relationship
SubscriptionLines - [SubscriptionLine!]!	An array relationship
compareAtPrice - numeric	
createdAt - timestamptz!	
deletedAt - timestamptz	
id - uuid!	
image - String	
marketPrices - jsonb	
outOfStockAt - timestamptz	
platformId - String!	
price - numeric!	
productId - uuid!	
sku - String	
title - String!	
updatedAt - timestamptz!	
Example
{
  "DynamicBox_SelectableProductVariants": [
    DynamicBox_SelectableProductVariant
  ],
  "OrderLineItems": [OrderLineItem],
  "Product": Product,
  "SellingPlanGroupResources": [SellingPlanGroupResource],
  "SubscriptionLines": [SubscriptionLine],
  "compareAtPrice": numeric,
  "createdAt": timestamptz,
  "deletedAt": timestamptz,
  "id": uuid,
  "image": "abc123",
  "marketPrices": jsonb,
  "outOfStockAt": timestamptz,
  "platformId": "abc123",
  "price": numeric,
  "productId": uuid,
  "sku": "abc123",
  "title": "abc123",
  "updatedAt": timestamptz
}
Types
ProductVariant_aggregate_order_by
Description
order by aggregate values of table "ProductVariant"

Fields
Input Field	Description
avg - ProductVariant_avg_order_by	
count - order_by	
max - ProductVariant_max_order_by	
min - ProductVariant_min_order_by	
stddev - ProductVariant_stddev_order_by	
stddev_pop - ProductVariant_stddev_pop_order_by	
stddev_samp - ProductVariant_stddev_samp_order_by	
sum - ProductVariant_sum_order_by	
var_pop - ProductVariant_var_pop_order_by	
var_samp - ProductVariant_var_samp_order_by	
variance - ProductVariant_variance_order_by	
Example
{
  "avg": ProductVariant_avg_order_by,
  "count": "asc",
  "max": ProductVariant_max_order_by,
  "min": ProductVariant_min_order_by,
  "stddev": ProductVariant_stddev_order_by,
  "stddev_pop": ProductVariant_stddev_pop_order_by,
  "stddev_samp": ProductVariant_stddev_samp_order_by,
  "sum": ProductVariant_sum_order_by,
  "var_pop": ProductVariant_var_pop_order_by,
  "var_samp": ProductVariant_var_samp_order_by,
  "variance": ProductVariant_variance_order_by
}
Types
ProductVariant_avg_order_by
Description
order by avg() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_bool_exp
Description
Boolean expression to filter rows from the table "ProductVariant". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DynamicBox_SelectableProductVariants - DynamicBox_SelectableProductVariant_bool_exp	
OrderLineItems - OrderLineItem_bool_exp	
Product - Product_bool_exp	
SellingPlanGroupResources - SellingPlanGroupResource_bool_exp	
SubscriptionLines - SubscriptionLine_bool_exp	
_and - [ProductVariant_bool_exp!]	
_not - ProductVariant_bool_exp	
_or - [ProductVariant_bool_exp!]	
compareAtPrice - numeric_comparison_exp	
createdAt - timestamptz_comparison_exp	
deletedAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
image - String_comparison_exp	
marketPrices - jsonb_comparison_exp	
outOfStockAt - timestamptz_comparison_exp	
platformId - String_comparison_exp	
price - numeric_comparison_exp	
productId - uuid_comparison_exp	
sku - String_comparison_exp	
title - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "DynamicBox_SelectableProductVariants": DynamicBox_SelectableProductVariant_bool_exp,
  "OrderLineItems": OrderLineItem_bool_exp,
  "Product": Product_bool_exp,
  "SellingPlanGroupResources": SellingPlanGroupResource_bool_exp,
  "SubscriptionLines": SubscriptionLine_bool_exp,
  "_and": [ProductVariant_bool_exp],
  "_not": ProductVariant_bool_exp,
  "_or": [ProductVariant_bool_exp],
  "compareAtPrice": numeric_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "deletedAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "image": String_comparison_exp,
  "marketPrices": jsonb_comparison_exp,
  "outOfStockAt": timestamptz_comparison_exp,
  "platformId": String_comparison_exp,
  "price": numeric_comparison_exp,
  "productId": uuid_comparison_exp,
  "sku": String_comparison_exp,
  "title": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
ProductVariant_max_order_by
Description
order by max() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
createdAt - order_by	
deletedAt - order_by	
id - order_by	
image - order_by	
outOfStockAt - order_by	
platformId - order_by	
price - order_by	
productId - order_by	
sku - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "compareAtPrice": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "id": "asc",
  "image": "asc",
  "outOfStockAt": "asc",
  "platformId": "asc",
  "price": "asc",
  "productId": "asc",
  "sku": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
ProductVariant_min_order_by
Description
order by min() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
createdAt - order_by	
deletedAt - order_by	
id - order_by	
image - order_by	
outOfStockAt - order_by	
platformId - order_by	
price - order_by	
productId - order_by	
sku - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "compareAtPrice": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "id": "asc",
  "image": "asc",
  "outOfStockAt": "asc",
  "platformId": "asc",
  "price": "asc",
  "productId": "asc",
  "sku": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
ProductVariant_order_by
Description
Ordering options when selecting data from "ProductVariant".

Fields
Input Field	Description
DynamicBox_SelectableProductVariants_aggregate - DynamicBox_SelectableProductVariant_aggregate_order_by	
OrderLineItems_aggregate - OrderLineItem_aggregate_order_by	
Product - Product_order_by	
SellingPlanGroupResources_aggregate - SellingPlanGroupResource_aggregate_order_by	
SubscriptionLines_aggregate - SubscriptionLine_aggregate_order_by	
compareAtPrice - order_by	
createdAt - order_by	
deletedAt - order_by	
id - order_by	
image - order_by	
marketPrices - order_by	
outOfStockAt - order_by	
platformId - order_by	
price - order_by	
productId - order_by	
sku - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "DynamicBox_SelectableProductVariants_aggregate": DynamicBox_SelectableProductVariant_aggregate_order_by,
  "OrderLineItems_aggregate": OrderLineItem_aggregate_order_by,
  "Product": Product_order_by,
  "SellingPlanGroupResources_aggregate": SellingPlanGroupResource_aggregate_order_by,
  "SubscriptionLines_aggregate": SubscriptionLine_aggregate_order_by,
  "compareAtPrice": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "id": "asc",
  "image": "asc",
  "marketPrices": "asc",
  "outOfStockAt": "asc",
  "platformId": "asc",
  "price": "asc",
  "productId": "asc",
  "sku": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
ProductVariant_select_column
Description
select columns of table "ProductVariant"

Values
Enum Value	Description
compareAtPrice

column name
createdAt

column name
deletedAt

column name
id

column name
image

column name
marketPrices

column name
outOfStockAt

column name
platformId

column name
price

column name
productId

column name
sku

column name
title

column name
updatedAt

column name
Example
"compareAtPrice"
Types
ProductVariant_stddev_order_by
Description
order by stddev() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_sum_order_by
Description
order by sum() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_var_pop_order_by
Description
order by var_pop() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_var_samp_order_by
Description
order by var_samp() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
ProductVariant_variance_order_by
Description
order by variance() on columns of table "ProductVariant"

Fields
Input Field	Description
compareAtPrice - order_by	
price - order_by	
Example
{"compareAtPrice": "asc", "price": "asc"}
Types
Product_aggregate_order_by
Description
order by aggregate values of table "Product"

Fields
Input Field	Description
avg - Product_avg_order_by	
count - order_by	
max - Product_max_order_by	
min - Product_min_order_by	
stddev - Product_stddev_order_by	
stddev_pop - Product_stddev_pop_order_by	
stddev_samp - Product_stddev_samp_order_by	
sum - Product_sum_order_by	
var_pop - Product_var_pop_order_by	
var_samp - Product_var_samp_order_by	
variance - Product_variance_order_by	
Example
{
  "avg": Product_avg_order_by,
  "count": "asc",
  "max": Product_max_order_by,
  "min": Product_min_order_by,
  "stddev": Product_stddev_order_by,
  "stddev_pop": Product_stddev_pop_order_by,
  "stddev_samp": Product_stddev_samp_order_by,
  "sum": Product_sum_order_by,
  "var_pop": Product_var_pop_order_by,
  "var_samp": Product_var_samp_order_by,
  "variance": Product_variance_order_by
}
Types
Product_avg_order_by
Description
order by avg() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_bool_exp
Description
Boolean expression to filter rows from the table "Product". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
DynamicBox - DynamicBox_bool_exp	
ProductVariants - ProductVariant_bool_exp	
Site - Site_bool_exp	
_and - [Product_bool_exp!]	
_not - Product_bool_exp	
_or - [Product_bool_exp!]	
canUpsell - Boolean_comparison_exp	
createdAt - timestamptz_comparison_exp	
deletedAt - timestamptz_comparison_exp	
description - String_comparison_exp	
hideOn1TimeUpsells - Boolean_comparison_exp	
id - uuid_comparison_exp	
imageSrc - String_comparison_exp	
images - jsonb_comparison_exp	
limitOneTimeUpsellQuantity - Boolean_comparison_exp	
metafields - jsonb_comparison_exp	
oneTimeUpsellPercentageOff - numeric_comparison_exp	
platformId - String_comparison_exp	
shopifyTags - jsonb_comparison_exp	
siteId - uuid_comparison_exp	
slug - String_comparison_exp	
smsOrder - Int_comparison_exp	
status - String_comparison_exp	
title - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "DynamicBox": DynamicBox_bool_exp,
  "ProductVariants": ProductVariant_bool_exp,
  "Site": Site_bool_exp,
  "_and": [Product_bool_exp],
  "_not": Product_bool_exp,
  "_or": [Product_bool_exp],
  "canUpsell": Boolean_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "deletedAt": timestamptz_comparison_exp,
  "description": String_comparison_exp,
  "hideOn1TimeUpsells": Boolean_comparison_exp,
  "id": uuid_comparison_exp,
  "imageSrc": String_comparison_exp,
  "images": jsonb_comparison_exp,
  "limitOneTimeUpsellQuantity": Boolean_comparison_exp,
  "metafields": jsonb_comparison_exp,
  "oneTimeUpsellPercentageOff": numeric_comparison_exp,
  "platformId": String_comparison_exp,
  "shopifyTags": jsonb_comparison_exp,
  "siteId": uuid_comparison_exp,
  "slug": String_comparison_exp,
  "smsOrder": Int_comparison_exp,
  "status": String_comparison_exp,
  "title": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Product_max_order_by
Description
order by max() on columns of table "Product"

Fields
Input Field	Description
createdAt - order_by	
deletedAt - order_by	
description - order_by	
id - order_by	
imageSrc - order_by	
oneTimeUpsellPercentageOff - order_by	
platformId - order_by	
siteId - order_by	
slug - order_by	
smsOrder - order_by	
status - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "deletedAt": "asc",
  "description": "asc",
  "id": "asc",
  "imageSrc": "asc",
  "oneTimeUpsellPercentageOff": "asc",
  "platformId": "asc",
  "siteId": "asc",
  "slug": "asc",
  "smsOrder": "asc",
  "status": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
Product_min_order_by
Description
order by min() on columns of table "Product"

Fields
Input Field	Description
createdAt - order_by	
deletedAt - order_by	
description - order_by	
id - order_by	
imageSrc - order_by	
oneTimeUpsellPercentageOff - order_by	
platformId - order_by	
siteId - order_by	
slug - order_by	
smsOrder - order_by	
status - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "deletedAt": "asc",
  "description": "asc",
  "id": "asc",
  "imageSrc": "asc",
  "oneTimeUpsellPercentageOff": "asc",
  "platformId": "asc",
  "siteId": "asc",
  "slug": "asc",
  "smsOrder": "asc",
  "status": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
Product_order_by
Description
Ordering options when selecting data from "Product".

Fields
Input Field	Description
DynamicBox - DynamicBox_order_by	
ProductVariants_aggregate - ProductVariant_aggregate_order_by	
Site - Site_order_by	
canUpsell - order_by	
createdAt - order_by	
deletedAt - order_by	
description - order_by	
hideOn1TimeUpsells - order_by	
id - order_by	
imageSrc - order_by	
images - order_by	
limitOneTimeUpsellQuantity - order_by	
metafields - order_by	
oneTimeUpsellPercentageOff - order_by	
platformId - order_by	
shopifyTags - order_by	
siteId - order_by	
slug - order_by	
smsOrder - order_by	
status - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "DynamicBox": DynamicBox_order_by,
  "ProductVariants_aggregate": ProductVariant_aggregate_order_by,
  "Site": Site_order_by,
  "canUpsell": "asc",
  "createdAt": "asc",
  "deletedAt": "asc",
  "description": "asc",
  "hideOn1TimeUpsells": "asc",
  "id": "asc",
  "imageSrc": "asc",
  "images": "asc",
  "limitOneTimeUpsellQuantity": "asc",
  "metafields": "asc",
  "oneTimeUpsellPercentageOff": "asc",
  "platformId": "asc",
  "shopifyTags": "asc",
  "siteId": "asc",
  "slug": "asc",
  "smsOrder": "asc",
  "status": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
Product_select_column
Description
select columns of table "Product"

Values
Enum Value	Description
canUpsell

column name
createdAt

column name
deletedAt

column name
description

column name
hideOn1TimeUpsells

column name
id

column name
imageSrc

column name
images

column name
limitOneTimeUpsellQuantity

column name
metafields

column name
oneTimeUpsellPercentageOff

column name
platformId

column name
shopifyTags

column name
siteId

column name
slug

column name
smsOrder

column name
status

column name
title

column name
updatedAt

column name
Example
"canUpsell"
Types
Product_stddev_order_by
Description
order by stddev() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_sum_order_by
Description
order by sum() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_var_pop_order_by
Description
order by var_pop() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_var_samp_order_by
Description
order by var_samp() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
Product_variance_order_by
Description
order by variance() on columns of table "Product"

Fields
Input Field	Description
oneTimeUpsellPercentageOff - order_by	
smsOrder - order_by	
Example
{"oneTimeUpsellPercentageOff": "asc", "smsOrder": "asc"}
Types
QuickActionsV3Stack_bool_exp
Description
Boolean expression to filter rows from the table "QuickActionsV3Stack". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Site - Site_bool_exp	
_and - [QuickActionsV3Stack_bool_exp!]	
_not - QuickActionsV3Stack_bool_exp	
_or - [QuickActionsV3Stack_bool_exp!]	
actionConfigs - jsonb_comparison_exp	
archivedAt - timestamptz_comparison_exp	
createdAt - timestamptz_comparison_exp	
customTitle - String_comparison_exp	
description - String_comparison_exp	
enabled - Boolean_comparison_exp	
expirationDate - timestamptz_comparison_exp	
id - uuid_comparison_exp	
name - String_comparison_exp	
savedAt - timestamptz_comparison_exp	
siteId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
urlSettings - jsonb_comparison_exp	
Example
{
  "Site": Site_bool_exp,
  "_and": [QuickActionsV3Stack_bool_exp],
  "_not": QuickActionsV3Stack_bool_exp,
  "_or": [QuickActionsV3Stack_bool_exp],
  "actionConfigs": jsonb_comparison_exp,
  "archivedAt": timestamptz_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "customTitle": String_comparison_exp,
  "description": String_comparison_exp,
  "enabled": Boolean_comparison_exp,
  "expirationDate": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "name": String_comparison_exp,
  "savedAt": timestamptz_comparison_exp,
  "siteId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp,
  "urlSettings": jsonb_comparison_exp
}
Types
SellingPlan
Description
columns and relationships of "SellingPlan"

Fields
Field Name	Description
BillingPolicy - Policy!	An object relationship
DeliveryPolicy - Policy!	An object relationship
GroupPlans - [GroupPlan!]!	An array relationship
PrepaidDeliveryPolicy - Policy	An object relationship
PricingPolicies - [PricingPolicy!]!	An array relationship
SellingPlanGroup - SellingPlanGroup!	An object relationship
SkuSwaps - [SkuSwap!]!	An array relationship
SubscriptionLines - [SubscriptionLine!]!	An array relationship
billingPolicyId - uuid!	
createdAt - timestamptz!	
deliveryPolicyId - uuid!	
id - uuid!	
name - String!	
option - String!	
platformId - String!	
position - Int!	
prepaidDeliveryPolicyId - uuid	
productVariantIdToSwapToAfterFirstOrder - String	
sellingPlanGroupId - uuid!	
updatedAt - timestamptz!	
Example
{
  "BillingPolicy": Policy,
  "DeliveryPolicy": Policy,
  "GroupPlans": [GroupPlan],
  "PrepaidDeliveryPolicy": Policy,
  "PricingPolicies": [PricingPolicy],
  "SellingPlanGroup": SellingPlanGroup,
  "SkuSwaps": [SkuSwap],
  "SubscriptionLines": [SubscriptionLine],
  "billingPolicyId": uuid,
  "createdAt": timestamptz,
  "deliveryPolicyId": uuid,
  "id": uuid,
  "name": "xyz789",
  "option": "xyz789",
  "platformId": "abc123",
  "position": 987,
  "prepaidDeliveryPolicyId": uuid,
  "productVariantIdToSwapToAfterFirstOrder": "abc123",
  "sellingPlanGroupId": uuid,
  "updatedAt": timestamptz
}
Types
SellingPlanGroup
Description
columns and relationships of "SellingPlanGroup"

Fields
Field Name	Description
SellingPlanGroupResources - [SellingPlanGroupResource!]!	An array relationship
SellingPlans - [SellingPlan!]!	An array relationship
byGroup - Boolean	
createdAt - timestamptz!	
customName - String	
id - uuid!	
name - String!	
platformId - String!	
updatedAt - timestamptz!	
Example
{
  "SellingPlanGroupResources": [SellingPlanGroupResource],
  "SellingPlans": [SellingPlan],
  "byGroup": true,
  "createdAt": timestamptz,
  "customName": "xyz789",
  "id": uuid,
  "name": "xyz789",
  "platformId": "abc123",
  "updatedAt": timestamptz
}
Types
SellingPlanGroupResource
Description
columns and relationships of "SellingPlanGroupResource"

Fields
Field Name	Description
ProductVariant - ProductVariant!	An object relationship
SellingPlanGroup - SellingPlanGroup!	An object relationship
createdAt - timestamptz!	
id - uuid!	
productVariantId - uuid!	
sellingPlanGroupId - uuid!	
updatedAt - timestamptz!	
Example
{
  "ProductVariant": ProductVariant,
  "SellingPlanGroup": SellingPlanGroup,
  "createdAt": timestamptz,
  "id": uuid,
  "productVariantId": uuid,
  "sellingPlanGroupId": uuid,
  "updatedAt": timestamptz
}
Types
SellingPlanGroupResource_aggregate_order_by
Description
order by aggregate values of table "SellingPlanGroupResource"

Fields
Input Field	Description
count - order_by	
max - SellingPlanGroupResource_max_order_by	
min - SellingPlanGroupResource_min_order_by	
Example
{
  "count": "asc",
  "max": SellingPlanGroupResource_max_order_by,
  "min": SellingPlanGroupResource_min_order_by
}
Types
SellingPlanGroupResource_bool_exp
Description
Boolean expression to filter rows from the table "SellingPlanGroupResource". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
ProductVariant - ProductVariant_bool_exp	
SellingPlanGroup - SellingPlanGroup_bool_exp	
_and - [SellingPlanGroupResource_bool_exp!]	
_not - SellingPlanGroupResource_bool_exp	
_or - [SellingPlanGroupResource_bool_exp!]	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
productVariantId - uuid_comparison_exp	
sellingPlanGroupId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "ProductVariant": ProductVariant_bool_exp,
  "SellingPlanGroup": SellingPlanGroup_bool_exp,
  "_and": [SellingPlanGroupResource_bool_exp],
  "_not": SellingPlanGroupResource_bool_exp,
  "_or": [SellingPlanGroupResource_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "productVariantId": uuid_comparison_exp,
  "sellingPlanGroupId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SellingPlanGroupResource_max_order_by
Description
order by max() on columns of table "SellingPlanGroupResource"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
productVariantId - order_by	
sellingPlanGroupId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "productVariantId": "asc",
  "sellingPlanGroupId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlanGroupResource_min_order_by
Description
order by min() on columns of table "SellingPlanGroupResource"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
productVariantId - order_by	
sellingPlanGroupId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "productVariantId": "asc",
  "sellingPlanGroupId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlanGroup_bool_exp
Description
Boolean expression to filter rows from the table "SellingPlanGroup". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
SellingPlanGroupResources - SellingPlanGroupResource_bool_exp	
SellingPlans - SellingPlan_bool_exp	
_and - [SellingPlanGroup_bool_exp!]	
_not - SellingPlanGroup_bool_exp	
_or - [SellingPlanGroup_bool_exp!]	
byGroup - Boolean_comparison_exp	
createdAt - timestamptz_comparison_exp	
customName - String_comparison_exp	
id - uuid_comparison_exp	
name - String_comparison_exp	
platformId - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "SellingPlanGroupResources": SellingPlanGroupResource_bool_exp,
  "SellingPlans": SellingPlan_bool_exp,
  "_and": [SellingPlanGroup_bool_exp],
  "_not": SellingPlanGroup_bool_exp,
  "_or": [SellingPlanGroup_bool_exp],
  "byGroup": Boolean_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "customName": String_comparison_exp,
  "id": uuid_comparison_exp,
  "name": String_comparison_exp,
  "platformId": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SellingPlanGroup_order_by
Description
Ordering options when selecting data from "SellingPlanGroup".

Fields
Input Field	Description
SellingPlanGroupResources_aggregate - SellingPlanGroupResource_aggregate_order_by	
SellingPlans_aggregate - SellingPlan_aggregate_order_by	
byGroup - order_by	
createdAt - order_by	
customName - order_by	
id - order_by	
name - order_by	
platformId - order_by	
updatedAt - order_by	
Example
{
  "SellingPlanGroupResources_aggregate": SellingPlanGroupResource_aggregate_order_by,
  "SellingPlans_aggregate": SellingPlan_aggregate_order_by,
  "byGroup": "asc",
  "createdAt": "asc",
  "customName": "asc",
  "id": "asc",
  "name": "asc",
  "platformId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlanIntervalEnum
Values
Enum Value	Description
DAY

MONTH

WEEK

YEAR

Example
"DAY"
Types
SellingPlan_aggregate_order_by
Description
order by aggregate values of table "SellingPlan"

Fields
Input Field	Description
avg - SellingPlan_avg_order_by	
count - order_by	
max - SellingPlan_max_order_by	
min - SellingPlan_min_order_by	
stddev - SellingPlan_stddev_order_by	
stddev_pop - SellingPlan_stddev_pop_order_by	
stddev_samp - SellingPlan_stddev_samp_order_by	
sum - SellingPlan_sum_order_by	
var_pop - SellingPlan_var_pop_order_by	
var_samp - SellingPlan_var_samp_order_by	
variance - SellingPlan_variance_order_by	
Example
{
  "avg": SellingPlan_avg_order_by,
  "count": "asc",
  "max": SellingPlan_max_order_by,
  "min": SellingPlan_min_order_by,
  "stddev": SellingPlan_stddev_order_by,
  "stddev_pop": SellingPlan_stddev_pop_order_by,
  "stddev_samp": SellingPlan_stddev_samp_order_by,
  "sum": SellingPlan_sum_order_by,
  "var_pop": SellingPlan_var_pop_order_by,
  "var_samp": SellingPlan_var_samp_order_by,
  "variance": SellingPlan_variance_order_by
}
Types
SellingPlan_avg_order_by
Description
order by avg() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_bool_exp
Description
Boolean expression to filter rows from the table "SellingPlan". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
BillingPolicy - Policy_bool_exp	
DeliveryPolicy - Policy_bool_exp	
GroupPlans - GroupPlan_bool_exp	
PrepaidDeliveryPolicy - Policy_bool_exp	
PricingPolicies - PricingPolicy_bool_exp	
SellingPlanGroup - SellingPlanGroup_bool_exp	
SkuSwaps - SkuSwap_bool_exp	
SubscriptionLines - SubscriptionLine_bool_exp	
_and - [SellingPlan_bool_exp!]	
_not - SellingPlan_bool_exp	
_or - [SellingPlan_bool_exp!]	
billingPolicyId - uuid_comparison_exp	
createdAt - timestamptz_comparison_exp	
deliveryPolicyId - uuid_comparison_exp	
id - uuid_comparison_exp	
name - String_comparison_exp	
option - String_comparison_exp	
platformId - String_comparison_exp	
position - Int_comparison_exp	
prepaidDeliveryPolicyId - uuid_comparison_exp	
productVariantIdToSwapToAfterFirstOrder - String_comparison_exp	
sellingPlanGroupId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "BillingPolicy": Policy_bool_exp,
  "DeliveryPolicy": Policy_bool_exp,
  "GroupPlans": GroupPlan_bool_exp,
  "PrepaidDeliveryPolicy": Policy_bool_exp,
  "PricingPolicies": PricingPolicy_bool_exp,
  "SellingPlanGroup": SellingPlanGroup_bool_exp,
  "SkuSwaps": SkuSwap_bool_exp,
  "SubscriptionLines": SubscriptionLine_bool_exp,
  "_and": [SellingPlan_bool_exp],
  "_not": SellingPlan_bool_exp,
  "_or": [SellingPlan_bool_exp],
  "billingPolicyId": uuid_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "deliveryPolicyId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "name": String_comparison_exp,
  "option": String_comparison_exp,
  "platformId": String_comparison_exp,
  "position": Int_comparison_exp,
  "prepaidDeliveryPolicyId": uuid_comparison_exp,
  "productVariantIdToSwapToAfterFirstOrder": String_comparison_exp,
  "sellingPlanGroupId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SellingPlan_max_order_by
Description
order by max() on columns of table "SellingPlan"

Fields
Input Field	Description
billingPolicyId - order_by	
createdAt - order_by	
deliveryPolicyId - order_by	
id - order_by	
name - order_by	
option - order_by	
platformId - order_by	
position - order_by	
prepaidDeliveryPolicyId - order_by	
productVariantIdToSwapToAfterFirstOrder - order_by	
sellingPlanGroupId - order_by	
updatedAt - order_by	
Example
{
  "billingPolicyId": "asc",
  "createdAt": "asc",
  "deliveryPolicyId": "asc",
  "id": "asc",
  "name": "asc",
  "option": "asc",
  "platformId": "asc",
  "position": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "productVariantIdToSwapToAfterFirstOrder": "asc",
  "sellingPlanGroupId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlan_min_order_by
Description
order by min() on columns of table "SellingPlan"

Fields
Input Field	Description
billingPolicyId - order_by	
createdAt - order_by	
deliveryPolicyId - order_by	
id - order_by	
name - order_by	
option - order_by	
platformId - order_by	
position - order_by	
prepaidDeliveryPolicyId - order_by	
productVariantIdToSwapToAfterFirstOrder - order_by	
sellingPlanGroupId - order_by	
updatedAt - order_by	
Example
{
  "billingPolicyId": "asc",
  "createdAt": "asc",
  "deliveryPolicyId": "asc",
  "id": "asc",
  "name": "asc",
  "option": "asc",
  "platformId": "asc",
  "position": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "productVariantIdToSwapToAfterFirstOrder": "asc",
  "sellingPlanGroupId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlan_order_by
Description
Ordering options when selecting data from "SellingPlan".

Fields
Input Field	Description
BillingPolicy - Policy_order_by	
DeliveryPolicy - Policy_order_by	
GroupPlans_aggregate - GroupPlan_aggregate_order_by	
PrepaidDeliveryPolicy - Policy_order_by	
PricingPolicies_aggregate - PricingPolicy_aggregate_order_by	
SellingPlanGroup - SellingPlanGroup_order_by	
SkuSwaps_aggregate - SkuSwap_aggregate_order_by	
SubscriptionLines_aggregate - SubscriptionLine_aggregate_order_by	
billingPolicyId - order_by	
createdAt - order_by	
deliveryPolicyId - order_by	
id - order_by	
name - order_by	
option - order_by	
platformId - order_by	
position - order_by	
prepaidDeliveryPolicyId - order_by	
productVariantIdToSwapToAfterFirstOrder - order_by	
sellingPlanGroupId - order_by	
updatedAt - order_by	
Example
{
  "BillingPolicy": Policy_order_by,
  "DeliveryPolicy": Policy_order_by,
  "GroupPlans_aggregate": GroupPlan_aggregate_order_by,
  "PrepaidDeliveryPolicy": Policy_order_by,
  "PricingPolicies_aggregate": PricingPolicy_aggregate_order_by,
  "SellingPlanGroup": SellingPlanGroup_order_by,
  "SkuSwaps_aggregate": SkuSwap_aggregate_order_by,
  "SubscriptionLines_aggregate": SubscriptionLine_aggregate_order_by,
  "billingPolicyId": "asc",
  "createdAt": "asc",
  "deliveryPolicyId": "asc",
  "id": "asc",
  "name": "asc",
  "option": "asc",
  "platformId": "asc",
  "position": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "productVariantIdToSwapToAfterFirstOrder": "asc",
  "sellingPlanGroupId": "asc",
  "updatedAt": "asc"
}
Types
SellingPlan_stddev_order_by
Description
order by stddev() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_sum_order_by
Description
order by sum() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_var_pop_order_by
Description
order by var_pop() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_var_samp_order_by
Description
order by var_samp() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SellingPlan_variance_order_by
Description
order by variance() on columns of table "SellingPlan"

Fields
Input Field	Description
position - order_by	
Example
{"position": "asc"}
Types
SetDeliveryPriceOverrideInput
Fields
Input Field	Description
deliveryPrice - Float	
subscriptionId - uuid!	
Example
{"deliveryPrice": 987.65, "subscriptionId": uuid}
Types
SetDeliveryPriceOverrideOutput
Fields
Field Name	Description
subscriptionId - uuid!	
Example
{"subscriptionId": uuid}
Types
ShipNowInput
Fields
Input Field	Description
caller - String	
subscriptionId - String!	
Example
{
  "caller": "xyz789",
  "subscriptionId": "abc123"
}
Types
ShipNowOutput
Fields
Field Name	Description
message - String	
ok - Boolean!	
Example
{"message": "abc123", "ok": true}
Types
ShippingLine
Description
columns and relationships of "ShippingLine"

Fields
Field Name	Description
Discounts - [Discount!]!	An array relationship
Order - Order!	An object relationship
TaxLines - [TaxLine!]!	An array relationship
createdAt - timestamptz!	
id - uuid!	
orderId - uuid!	
platformId - String!	
priceWithoutDiscount - numeric!	
title - String!	
updatedAt - timestamptz!	
Example
{
  "Discounts": [Discount],
  "Order": Order,
  "TaxLines": [TaxLine],
  "createdAt": timestamptz,
  "id": uuid,
  "orderId": uuid,
  "platformId": "xyz789",
  "priceWithoutDiscount": numeric,
  "title": "xyz789",
  "updatedAt": timestamptz
}
Types
ShippingLine_aggregate_order_by
Description
order by aggregate values of table "ShippingLine"

Fields
Input Field	Description
avg - ShippingLine_avg_order_by	
count - order_by	
max - ShippingLine_max_order_by	
min - ShippingLine_min_order_by	
stddev - ShippingLine_stddev_order_by	
stddev_pop - ShippingLine_stddev_pop_order_by	
stddev_samp - ShippingLine_stddev_samp_order_by	
sum - ShippingLine_sum_order_by	
var_pop - ShippingLine_var_pop_order_by	
var_samp - ShippingLine_var_samp_order_by	
variance - ShippingLine_variance_order_by	
Example
{
  "avg": ShippingLine_avg_order_by,
  "count": "asc",
  "max": ShippingLine_max_order_by,
  "min": ShippingLine_min_order_by,
  "stddev": ShippingLine_stddev_order_by,
  "stddev_pop": ShippingLine_stddev_pop_order_by,
  "stddev_samp": ShippingLine_stddev_samp_order_by,
  "sum": ShippingLine_sum_order_by,
  "var_pop": ShippingLine_var_pop_order_by,
  "var_samp": ShippingLine_var_samp_order_by,
  "variance": ShippingLine_variance_order_by
}
Types
ShippingLine_avg_order_by
Description
order by avg() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_bool_exp
Description
Boolean expression to filter rows from the table "ShippingLine". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Discounts - Discount_bool_exp	
Order - Order_bool_exp	
TaxLines - TaxLine_bool_exp	
_and - [ShippingLine_bool_exp!]	
_not - ShippingLine_bool_exp	
_or - [ShippingLine_bool_exp!]	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
orderId - uuid_comparison_exp	
platformId - String_comparison_exp	
priceWithoutDiscount - numeric_comparison_exp	
title - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Discounts": Discount_bool_exp,
  "Order": Order_bool_exp,
  "TaxLines": TaxLine_bool_exp,
  "_and": [ShippingLine_bool_exp],
  "_not": ShippingLine_bool_exp,
  "_or": [ShippingLine_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "orderId": uuid_comparison_exp,
  "platformId": String_comparison_exp,
  "priceWithoutDiscount": numeric_comparison_exp,
  "title": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
ShippingLine_max_order_by
Description
order by max() on columns of table "ShippingLine"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
orderId - order_by	
platformId - order_by	
priceWithoutDiscount - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "orderId": "asc",
  "platformId": "asc",
  "priceWithoutDiscount": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
ShippingLine_min_order_by
Description
order by min() on columns of table "ShippingLine"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
orderId - order_by	
platformId - order_by	
priceWithoutDiscount - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "orderId": "asc",
  "platformId": "asc",
  "priceWithoutDiscount": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
ShippingLine_stddev_order_by
Description
order by stddev() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_sum_order_by
Description
order by sum() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_var_pop_order_by
Description
order by var_pop() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_var_samp_order_by
Description
order by var_samp() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
ShippingLine_variance_order_by
Description
order by variance() on columns of table "ShippingLine"

Fields
Input Field	Description
priceWithoutDiscount - order_by	
Example
{"priceWithoutDiscount": "asc"}
Types
Site
Description
Needs to be public for unauth to login.

Fields
Field Name	Description
Holidays - [Holiday!]!	An array relationship
Notifications - [Notification!]!	An array relationship
Products - [Product!]!	An array relationship
SkioSmsMessagingHistory - [SkioSmsMessagingHistory!]!	An array relationship
StorefrontUsers - [StorefrontUser!]!	An array relationship
Theme - Theme	An object relationship
Theme2 - Theme2	An object relationship
currencyCode - String!	
ianaTimezone - String	
id - uuid!	
qaAuthSettings - jsonb	
Example
{
  "Holidays": [Holiday],
  "Notifications": [Notification],
  "Products": [Product],
  "SkioSmsMessagingHistory": [SkioSmsMessagingHistory],
  "StorefrontUsers": [StorefrontUser],
  "Theme": Theme,
  "Theme2": Theme2,
  "currencyCode": "abc123",
  "ianaTimezone": "abc123",
  "id": uuid,
  "qaAuthSettings": jsonb
}
Types
Site_bool_exp
Description
Boolean expression to filter rows from the table "Site". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Holidays - Holiday_bool_exp	
Notifications - Notification_bool_exp	
Products - Product_bool_exp	
SkioSmsMessagingHistory - SkioSmsMessagingHistory_bool_exp	
StorefrontUsers - StorefrontUser_bool_exp	
Theme - Theme_bool_exp	
Theme2 - Theme2_bool_exp	
_and - [Site_bool_exp!]	
_not - Site_bool_exp	
_or - [Site_bool_exp!]	
currencyCode - String_comparison_exp	
ianaTimezone - String_comparison_exp	
id - uuid_comparison_exp	
qaAuthSettings - jsonb_comparison_exp	
Example
{
  "Holidays": Holiday_bool_exp,
  "Notifications": Notification_bool_exp,
  "Products": Product_bool_exp,
  "SkioSmsMessagingHistory": SkioSmsMessagingHistory_bool_exp,
  "StorefrontUsers": StorefrontUser_bool_exp,
  "Theme": Theme_bool_exp,
  "Theme2": Theme2_bool_exp,
  "_and": [Site_bool_exp],
  "_not": Site_bool_exp,
  "_or": [Site_bool_exp],
  "currencyCode": String_comparison_exp,
  "ianaTimezone": String_comparison_exp,
  "id": uuid_comparison_exp,
  "qaAuthSettings": jsonb_comparison_exp
}
Types
Site_order_by
Description
Ordering options when selecting data from "Site".

Fields
Input Field	Description
Holidays_aggregate - Holiday_aggregate_order_by	
Notifications_aggregate - Notification_aggregate_order_by	
Products_aggregate - Product_aggregate_order_by	
SkioSmsMessagingHistory_aggregate - SkioSmsMessagingHistory_aggregate_order_by	
StorefrontUsers_aggregate - StorefrontUser_aggregate_order_by	
Theme - Theme_order_by	
Theme2 - Theme2_order_by	
currencyCode - order_by	
ianaTimezone - order_by	
id - order_by	
qaAuthSettings - order_by	
Example
{
  "Holidays_aggregate": Holiday_aggregate_order_by,
  "Notifications_aggregate": Notification_aggregate_order_by,
  "Products_aggregate": Product_aggregate_order_by,
  "SkioSmsMessagingHistory_aggregate": SkioSmsMessagingHistory_aggregate_order_by,
  "StorefrontUsers_aggregate": StorefrontUser_aggregate_order_by,
  "Theme": Theme_order_by,
  "Theme2": Theme2_order_by,
  "currencyCode": "asc",
  "ianaTimezone": "asc",
  "id": "asc",
  "qaAuthSettings": "asc"
}
Types
Site_pk_columns_input
Description
primary key columns input for table: Site

Fields
Input Field	Description
id - uuid!	
Example
{"id": uuid}
Types
Site_set_input
Description
input type for updating data in table "Site"

Fields
Input Field	Description
useFlycodeDunning - Boolean	
Example
{"useFlycodeDunning": false}
Types
SkioSmsMessagingHistory
Description
Message logs for all SkioSMS messages, including static and SmsBot logs

Fields
Field Name	Description
Site - Site	An object relationship
StorefrontUser - StorefrontUser!	An object relationship
createdAt - timestamptz	
customerMessage - String!	
id - uuid!	
response - String!	Response sent to the customer
sessionId - uuid!	Groups messages by session, necessary for grouping logs+feeding history to bot prompts
siteId - uuid	Can be null if site is deleted. Only storefrontUser deletions will cascade
storefrontUserId - uuid!	
updatedAt - timestamptz	
Example
{
  "Site": Site,
  "StorefrontUser": StorefrontUser,
  "createdAt": timestamptz,
  "customerMessage": "abc123",
  "id": uuid,
  "response": "abc123",
  "sessionId": uuid,
  "siteId": uuid,
  "storefrontUserId": uuid,
  "updatedAt": timestamptz
}
Types
SkioSmsMessagingHistory_aggregate_order_by
Description
order by aggregate values of table "SkioSmsMessagingHistory"

Fields
Input Field	Description
count - order_by	
max - SkioSmsMessagingHistory_max_order_by	
min - SkioSmsMessagingHistory_min_order_by	
Example
{
  "count": "asc",
  "max": SkioSmsMessagingHistory_max_order_by,
  "min": SkioSmsMessagingHistory_min_order_by
}
Types
SkioSmsMessagingHistory_bool_exp
Description
Boolean expression to filter rows from the table "SkioSmsMessagingHistory". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Site - Site_bool_exp	
StorefrontUser - StorefrontUser_bool_exp	
_and - [SkioSmsMessagingHistory_bool_exp!]	
_not - SkioSmsMessagingHistory_bool_exp	
_or - [SkioSmsMessagingHistory_bool_exp!]	
createdAt - timestamptz_comparison_exp	
customerMessage - String_comparison_exp	
id - uuid_comparison_exp	
response - String_comparison_exp	
sessionId - uuid_comparison_exp	
siteId - uuid_comparison_exp	
storefrontUserId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Site": Site_bool_exp,
  "StorefrontUser": StorefrontUser_bool_exp,
  "_and": [SkioSmsMessagingHistory_bool_exp],
  "_not": SkioSmsMessagingHistory_bool_exp,
  "_or": [SkioSmsMessagingHistory_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "customerMessage": String_comparison_exp,
  "id": uuid_comparison_exp,
  "response": String_comparison_exp,
  "sessionId": uuid_comparison_exp,
  "siteId": uuid_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SkioSmsMessagingHistory_max_order_by
Description
order by max() on columns of table "SkioSmsMessagingHistory"

Fields
Input Field	Description
createdAt - order_by	
customerMessage - order_by	
id - order_by	
response - order_by	Response sent to the customer
sessionId - order_by	Groups messages by session, necessary for grouping logs+feeding history to bot prompts
siteId - order_by	Can be null if site is deleted. Only storefrontUser deletions will cascade
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "customerMessage": "asc",
  "id": "asc",
  "response": "asc",
  "sessionId": "asc",
  "siteId": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
SkioSmsMessagingHistory_min_order_by
Description
order by min() on columns of table "SkioSmsMessagingHistory"

Fields
Input Field	Description
createdAt - order_by	
customerMessage - order_by	
id - order_by	
response - order_by	Response sent to the customer
sessionId - order_by	Groups messages by session, necessary for grouping logs+feeding history to bot prompts
siteId - order_by	Can be null if site is deleted. Only storefrontUser deletions will cascade
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "customerMessage": "asc",
  "id": "asc",
  "response": "asc",
  "sessionId": "asc",
  "siteId": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
SkipOption
Fields
Input Field	Description
unit - String!	
value - Float!	
Example
{"unit": "abc123", "value": 123.45}
Types
SkuSwap
Description
columns and relationships of "SkuSwap"

Fields
Field Name	Description
SellingPlan - SellingPlan!	An object relationship
afterOrderNumber - Int!	
createdAt - timestamptz!	
id - uuid!	
newPrice - numeric	
overrideDaysToNextBilling - Int	
productVariantFromPlatformId - String	
productVariantPlatformId - String	
removedAt - timestamp	
sellingPlanId - uuid!	
siteId - uuid!	
sku - String	
updatedAt - timestamptz!	
Example
{
  "SellingPlan": SellingPlan,
  "afterOrderNumber": 123,
  "createdAt": timestamptz,
  "id": uuid,
  "newPrice": numeric,
  "overrideDaysToNextBilling": 987,
  "productVariantFromPlatformId": "xyz789",
  "productVariantPlatformId": "xyz789",
  "removedAt": timestamp,
  "sellingPlanId": uuid,
  "siteId": uuid,
  "sku": "abc123",
  "updatedAt": timestamptz
}
Types
SkuSwap_aggregate_order_by
Description
order by aggregate values of table "SkuSwap"

Fields
Input Field	Description
avg - SkuSwap_avg_order_by	
count - order_by	
max - SkuSwap_max_order_by	
min - SkuSwap_min_order_by	
stddev - SkuSwap_stddev_order_by	
stddev_pop - SkuSwap_stddev_pop_order_by	
stddev_samp - SkuSwap_stddev_samp_order_by	
sum - SkuSwap_sum_order_by	
var_pop - SkuSwap_var_pop_order_by	
var_samp - SkuSwap_var_samp_order_by	
variance - SkuSwap_variance_order_by	
Example
{
  "avg": SkuSwap_avg_order_by,
  "count": "asc",
  "max": SkuSwap_max_order_by,
  "min": SkuSwap_min_order_by,
  "stddev": SkuSwap_stddev_order_by,
  "stddev_pop": SkuSwap_stddev_pop_order_by,
  "stddev_samp": SkuSwap_stddev_samp_order_by,
  "sum": SkuSwap_sum_order_by,
  "var_pop": SkuSwap_var_pop_order_by,
  "var_samp": SkuSwap_var_samp_order_by,
  "variance": SkuSwap_variance_order_by
}
Types
SkuSwap_avg_order_by
Description
order by avg() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_bool_exp
Description
Boolean expression to filter rows from the table "SkuSwap". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
SellingPlan - SellingPlan_bool_exp	
_and - [SkuSwap_bool_exp!]	
_not - SkuSwap_bool_exp	
_or - [SkuSwap_bool_exp!]	
afterOrderNumber - Int_comparison_exp	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
newPrice - numeric_comparison_exp	
overrideDaysToNextBilling - Int_comparison_exp	
productVariantFromPlatformId - String_comparison_exp	
productVariantPlatformId - String_comparison_exp	
removedAt - timestamp_comparison_exp	
sellingPlanId - uuid_comparison_exp	
siteId - uuid_comparison_exp	
sku - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "SellingPlan": SellingPlan_bool_exp,
  "_and": [SkuSwap_bool_exp],
  "_not": SkuSwap_bool_exp,
  "_or": [SkuSwap_bool_exp],
  "afterOrderNumber": Int_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "newPrice": numeric_comparison_exp,
  "overrideDaysToNextBilling": Int_comparison_exp,
  "productVariantFromPlatformId": String_comparison_exp,
  "productVariantPlatformId": String_comparison_exp,
  "removedAt": timestamp_comparison_exp,
  "sellingPlanId": uuid_comparison_exp,
  "siteId": uuid_comparison_exp,
  "sku": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SkuSwap_max_order_by
Description
order by max() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
createdAt - order_by	
id - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
productVariantFromPlatformId - order_by	
productVariantPlatformId - order_by	
removedAt - order_by	
sellingPlanId - order_by	
siteId - order_by	
sku - order_by	
updatedAt - order_by	
Example
{
  "afterOrderNumber": "asc",
  "createdAt": "asc",
  "id": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc",
  "productVariantFromPlatformId": "asc",
  "productVariantPlatformId": "asc",
  "removedAt": "asc",
  "sellingPlanId": "asc",
  "siteId": "asc",
  "sku": "asc",
  "updatedAt": "asc"
}
Types
SkuSwap_min_order_by
Description
order by min() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
createdAt - order_by	
id - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
productVariantFromPlatformId - order_by	
productVariantPlatformId - order_by	
removedAt - order_by	
sellingPlanId - order_by	
siteId - order_by	
sku - order_by	
updatedAt - order_by	
Example
{
  "afterOrderNumber": "asc",
  "createdAt": "asc",
  "id": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc",
  "productVariantFromPlatformId": "asc",
  "productVariantPlatformId": "asc",
  "removedAt": "asc",
  "sellingPlanId": "asc",
  "siteId": "asc",
  "sku": "asc",
  "updatedAt": "asc"
}
Types
SkuSwap_stddev_order_by
Description
order by stddev() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_sum_order_by
Description
order by sum() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_var_pop_order_by
Description
order by var_pop() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_var_samp_order_by
Description
order by var_samp() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
SkuSwap_variance_order_by
Description
order by variance() on columns of table "SkuSwap"

Fields
Input Field	Description
afterOrderNumber - order_by	
newPrice - order_by	
overrideDaysToNextBilling - order_by	
Example
{
  "afterOrderNumber": "asc",
  "newPrice": "asc",
  "overrideDaysToNextBilling": "asc"
}
Types
StorefrontUser
Description
columns and relationships of "StorefrontUser"

Fields
Field Name	Description
AuditLogs - [AuditLog!]!	An array relationship
BackupPaymentMethod - PaymentMethod	An object relationship
Orders - [Order!]!	An array relationship
PaymentMethods - [PaymentMethod!]!	An array relationship
ShippingAddresses - [Address!]!	An array relationship
Site - Site!	An object relationship
SkioSmsMessagingHistory - [SkioSmsMessagingHistory!]!	An array relationship
Subscriptions - [Subscription!]!	An array relationship
User - User	An object relationship
createdAt - timestamptz!	
email - String	
firstName - String	
id - uuid!	
lastName - String	
phoneNumber - String	
platformId - String	
qaToken - uuid	
redactedAt - timestamptz	
removedAt - timestamptz	
shopifyTags - jsonb	
siteId - uuid!	
updatedAt - timestamptz!	
Example
{
  "AuditLogs": [AuditLog],
  "BackupPaymentMethod": PaymentMethod,
  "Orders": [Order],
  "PaymentMethods": [PaymentMethod],
  "ShippingAddresses": [Address],
  "Site": Site,
  "SkioSmsMessagingHistory": [SkioSmsMessagingHistory],
  "Subscriptions": [Subscription],
  "User": User,
  "createdAt": timestamptz,
  "email": "xyz789",
  "firstName": "xyz789",
  "id": uuid,
  "lastName": "xyz789",
  "phoneNumber": "abc123",
  "platformId": "abc123",
  "qaToken": uuid,
  "redactedAt": timestamptz,
  "removedAt": timestamptz,
  "shopifyTags": jsonb,
  "siteId": uuid,
  "updatedAt": timestamptz
}
Types
StorefrontUser_aggregate_order_by
Description
order by aggregate values of table "StorefrontUser"

Fields
Input Field	Description
count - order_by	
max - StorefrontUser_max_order_by	
min - StorefrontUser_min_order_by	
Example
{
  "count": "asc",
  "max": StorefrontUser_max_order_by,
  "min": StorefrontUser_min_order_by
}
Types
StorefrontUser_bool_exp
Description
Boolean expression to filter rows from the table "StorefrontUser". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
AuditLogs - AuditLog_bool_exp	
BackupPaymentMethod - PaymentMethod_bool_exp	
Orders - Order_bool_exp	
PaymentMethods - PaymentMethod_bool_exp	
ShippingAddresses - Address_bool_exp	
Site - Site_bool_exp	
SkioSmsMessagingHistory - SkioSmsMessagingHistory_bool_exp	
Subscriptions - Subscription_bool_exp	
User - User_bool_exp	
_and - [StorefrontUser_bool_exp!]	
_not - StorefrontUser_bool_exp	
_or - [StorefrontUser_bool_exp!]	
createdAt - timestamptz_comparison_exp	
email - String_comparison_exp	
firstName - String_comparison_exp	
id - uuid_comparison_exp	
lastName - String_comparison_exp	
phoneNumber - String_comparison_exp	
platformId - String_comparison_exp	
qaToken - uuid_comparison_exp	
redactedAt - timestamptz_comparison_exp	
removedAt - timestamptz_comparison_exp	
shopifyTags - jsonb_comparison_exp	
siteId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "AuditLogs": AuditLog_bool_exp,
  "BackupPaymentMethod": PaymentMethod_bool_exp,
  "Orders": Order_bool_exp,
  "PaymentMethods": PaymentMethod_bool_exp,
  "ShippingAddresses": Address_bool_exp,
  "Site": Site_bool_exp,
  "SkioSmsMessagingHistory": SkioSmsMessagingHistory_bool_exp,
  "Subscriptions": Subscription_bool_exp,
  "User": User_bool_exp,
  "_and": [StorefrontUser_bool_exp],
  "_not": StorefrontUser_bool_exp,
  "_or": [StorefrontUser_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "email": String_comparison_exp,
  "firstName": String_comparison_exp,
  "id": uuid_comparison_exp,
  "lastName": String_comparison_exp,
  "phoneNumber": String_comparison_exp,
  "platformId": String_comparison_exp,
  "qaToken": uuid_comparison_exp,
  "redactedAt": timestamptz_comparison_exp,
  "removedAt": timestamptz_comparison_exp,
  "shopifyTags": jsonb_comparison_exp,
  "siteId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
StorefrontUser_max_order_by
Description
order by max() on columns of table "StorefrontUser"

Fields
Input Field	Description
createdAt - order_by	
email - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
qaToken - order_by	
redactedAt - order_by	
removedAt - order_by	
siteId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "email": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "qaToken": "asc",
  "redactedAt": "asc",
  "removedAt": "asc",
  "siteId": "asc",
  "updatedAt": "asc"
}
Types
StorefrontUser_min_order_by
Description
order by min() on columns of table "StorefrontUser"

Fields
Input Field	Description
createdAt - order_by	
email - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
qaToken - order_by	
redactedAt - order_by	
removedAt - order_by	
siteId - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "email": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "qaToken": "asc",
  "redactedAt": "asc",
  "removedAt": "asc",
  "siteId": "asc",
  "updatedAt": "asc"
}
Types
StorefrontUser_order_by
Description
Ordering options when selecting data from "StorefrontUser".

Fields
Input Field	Description
AuditLogs_aggregate - AuditLog_aggregate_order_by	
BackupPaymentMethod - PaymentMethod_order_by	
Orders_aggregate - Order_aggregate_order_by	
PaymentMethods_aggregate - PaymentMethod_aggregate_order_by	
ShippingAddresses_aggregate - Address_aggregate_order_by	
Site - Site_order_by	
SkioSmsMessagingHistory_aggregate - SkioSmsMessagingHistory_aggregate_order_by	
Subscriptions_aggregate - Subscription_aggregate_order_by	
User - User_order_by	
createdAt - order_by	
email - order_by	
firstName - order_by	
id - order_by	
lastName - order_by	
phoneNumber - order_by	
platformId - order_by	
qaToken - order_by	
redactedAt - order_by	
removedAt - order_by	
shopifyTags - order_by	
siteId - order_by	
updatedAt - order_by	
Example
{
  "AuditLogs_aggregate": AuditLog_aggregate_order_by,
  "BackupPaymentMethod": PaymentMethod_order_by,
  "Orders_aggregate": Order_aggregate_order_by,
  "PaymentMethods_aggregate": PaymentMethod_aggregate_order_by,
  "ShippingAddresses_aggregate": Address_aggregate_order_by,
  "Site": Site_order_by,
  "SkioSmsMessagingHistory_aggregate": SkioSmsMessagingHistory_aggregate_order_by,
  "Subscriptions_aggregate": Subscription_aggregate_order_by,
  "User": User_order_by,
  "createdAt": "asc",
  "email": "asc",
  "firstName": "asc",
  "id": "asc",
  "lastName": "asc",
  "phoneNumber": "asc",
  "platformId": "asc",
  "qaToken": "asc",
  "redactedAt": "asc",
  "removedAt": "asc",
  "shopifyTags": "asc",
  "siteId": "asc",
  "updatedAt": "asc"
}
Types
StorefrontUser_select_column
Description
select columns of table "StorefrontUser"

Values
Enum Value	Description
createdAt

column name
email

column name
firstName

column name
id

column name
lastName

column name
phoneNumber

column name
platformId

column name
qaToken

column name
redactedAt

column name
removedAt

column name
shopifyTags

column name
siteId

column name
updatedAt

column name
Example
"createdAt"
Types
String
Example
"xyz789"
Types
String_comparison_exp
Description
Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - String	
_gt - String	
_gte - String	
_ilike - String	does the column match the given case-insensitive pattern
_in - [String!]	
_iregex - String	does the column match the given POSIX regular expression, case insensitive
_is_null - Boolean	
_like - String	does the column match the given pattern
_lt - String	
_lte - String	
_neq - String	
_nilike - String	does the column NOT match the given case-insensitive pattern
_nin - [String!]	
_niregex - String	does the column NOT match the given POSIX regular expression, case insensitive
_nlike - String	does the column NOT match the given pattern
_nregex - String	does the column NOT match the given POSIX regular expression, case sensitive
_nsimilar - String	does the column NOT match the given SQL regular expression
_regex - String	does the column match the given POSIX regular expression, case sensitive
_similar - String	does the column match the given SQL regular expression
Example
{
  "_eq": "xyz789",
  "_gt": "xyz789",
  "_gte": "abc123",
  "_ilike": "abc123",
  "_in": ["abc123"],
  "_iregex": "abc123",
  "_is_null": true,
  "_like": "abc123",
  "_lt": "abc123",
  "_lte": "abc123",
  "_neq": "xyz789",
  "_nilike": "abc123",
  "_nin": ["abc123"],
  "_niregex": "abc123",
  "_nlike": "abc123",
  "_nregex": "xyz789",
  "_nsimilar": "xyz789",
  "_regex": "xyz789",
  "_similar": "xyz789"
}
Types
Subscription
Description
statusContext: oneOf("CHURNED", "PERMANENTLY_CANCELLED"). Note: CancelFlowSessions has been deprecated, use CancelFlowV2Sessions instead

Fields
Field Name	Description
AuditLogs - [AuditLog!]!	An array relationship
BillingPolicy - Policy!	An object relationship
CancelFlowSessions - [CancelFlowSession!]!	An array relationship
CancelFlowV2Sessions - [CancelFlowV2Session!]!	An array relationship
DeliveryPolicy - Policy!	An object relationship
Discounts - [Discount!]!	An array relationship
FulfillmentOrders - [Order!]!	An array relationship
NotificationLogs - [NotificationLog!]!	An array relationship
PaymentMethod - PaymentMethod	An object relationship
PrepaidDeliveryPolicy - Policy	An object relationship
PrepaidGiftRecipient - StorefrontUser	An object relationship
PrepaidSubscriptionLines - [SubscriptionLine!]!	An array relationship
ShippingAddress - Address	An object relationship
Site - Site	An object relationship
StorefrontUser - StorefrontUser!	An object relationship
SubscriptionLines - [SubscriptionLine!]!	An array relationship
SurpriseDelightSessions - [SurpriseDelightSessions!]!	An array relationship
billingPolicyId - uuid!	
cancelledAt - timestamptz	
createdAt - timestamptz!	
currencyCode - String!	
customAttributes - jsonb	
cyclesCompleted - Int	
deliveryPolicyId - uuid!	
deliveryPrice - numeric!	
deliveryPriceOverride - Int	
id - uuid!	
isPickup - Boolean	
lastBillingAttemptAt - timestamptz	
metadata - jsonb	
migrationIndex - Int	
nextBillingDate - timestamptz	
note - String	
originOrder - Order	An object relationship
originOrderId - uuid	
platformId - String!	
prepaidDeliveryPolicyId - uuid	
prepaidProductPricesPerDelivery - jsonb	
shippingAddressId - uuid	
siteId - uuid!	
status - String!	
statusContext - String	
storefrontUserId - uuid!	
updatedAt - timestamptz!	
Example
{
  "AuditLogs": [AuditLog],
  "BillingPolicy": Policy,
  "CancelFlowSessions": [CancelFlowSession],
  "CancelFlowV2Sessions": [CancelFlowV2Session],
  "DeliveryPolicy": Policy,
  "Discounts": [Discount],
  "FulfillmentOrders": [Order],
  "NotificationLogs": [NotificationLog],
  "PaymentMethod": PaymentMethod,
  "PrepaidDeliveryPolicy": Policy,
  "PrepaidGiftRecipient": StorefrontUser,
  "PrepaidSubscriptionLines": [SubscriptionLine],
  "ShippingAddress": Address,
  "Site": Site,
  "StorefrontUser": StorefrontUser,
  "SubscriptionLines": [SubscriptionLine],
  "SurpriseDelightSessions": [SurpriseDelightSessions],
  "billingPolicyId": uuid,
  "cancelledAt": timestamptz,
  "createdAt": timestamptz,
  "currencyCode": "USD",
  "customAttributes": jsonb,
  "cyclesCompleted": 1,
  "deliveryPolicyId": uuid,
  "deliveryPrice": numeric,
  "deliveryPriceOverride": null,
  "id": uuid,
  "isPickup": false,
  "lastBillingAttemptAt": timestamptz,
  "metadata": jsonb,
  "migrationIndex": null,
  "nextBillingDate": timestamptz,
  "note": "test",
  "originOrder": Order,
  "originOrderId": uuid,
  "platformId": "gid://shopify/SubscriptionContract/12346616394",
  "prepaidDeliveryPolicyId": uuid,
  "prepaidProductPricesPerDelivery": jsonb,
  "shippingAddressId": uuid,
  "siteId": uuid,
  "status": "ACTIVE",
  "statusContext": null,
  "storefrontUserId": uuid,
  "updatedAt": timestamptz
}
Types
SubscriptionEditIntervalInput
Fields
Input Field	Description
billingInterval - String	
billingIntervalCount - Int	
nextBillingDate - String	
prepaidDeliveryInterval - String	
prepaidDeliveryIntervalCount - Int	
quickActionMetadata - jsonb	
subscriptionId - uuid!	
Example
{
  "billingInterval": "abc123",
  "billingIntervalCount": 123,
  "nextBillingDate": "xyz789",
  "prepaidDeliveryInterval": "xyz789",
  "prepaidDeliveryIntervalCount": 987,
  "quickActionMetadata": jsonb,
  "subscriptionId": uuid
}
Types
SubscriptionEditIntervalOutput
Fields
Field Name	Description
subscriptionId - uuid!	
Example
{"subscriptionId": uuid}
Types
SubscriptionLine
Description
columns and relationships of "SubscriptionLine"

Fields
Field Name	Description
Discounts - [Discount!]!	An array relationship
Group - Group	An object relationship
OrderLineItems - [OrderLineItem!]!	An array relationship
OriginalSellingPlan - SellingPlan	An object relationship
PrepaidSubscription - Subscription	An object relationship
ProductVariant - ProductVariant!	An object relationship
Subscription - Subscription	An object relationship
createdAt - timestamptz!	
customAttributes - jsonb	
groupId - uuid	only ever null if stale plan and unavailable groupplan
id - uuid!	
isPrepaid - Boolean!	
ordersRemaining - Int	
platformId - String	
prepaidSubscriptionId - uuid	
priceWithoutDiscount - numeric!	
productVariantId - uuid!	
quantity - Int!	
reChargeId - String	
removedAt - timestamptz	
sellingPlanId - uuid	
subscriptionId - uuid	
taxable - Boolean!	
titleOverride - String	
updatedAt - timestamptz!	
Example
{
  "Discounts": [Discount],
  "Group": Group,
  "OrderLineItems": [OrderLineItem],
  "OriginalSellingPlan": SellingPlan,
  "PrepaidSubscription": Subscription,
  "ProductVariant": ProductVariant,
  "Subscription": Subscription,
  "createdAt": timestamptz,
  "customAttributes": jsonb,
  "groupId": uuid,
  "id": uuid,
  "isPrepaid": true,
  "ordersRemaining": 123,
  "platformId": "xyz789",
  "prepaidSubscriptionId": uuid,
  "priceWithoutDiscount": numeric,
  "productVariantId": uuid,
  "quantity": 987,
  "reChargeId": "xyz789",
  "removedAt": timestamptz,
  "sellingPlanId": uuid,
  "subscriptionId": uuid,
  "taxable": true,
  "titleOverride": "abc123",
  "updatedAt": timestamptz
}
Types
SubscriptionLine_aggregate_order_by
Description
order by aggregate values of table "SubscriptionLine"

Fields
Input Field	Description
avg - SubscriptionLine_avg_order_by	
count - order_by	
max - SubscriptionLine_max_order_by	
min - SubscriptionLine_min_order_by	
stddev - SubscriptionLine_stddev_order_by	
stddev_pop - SubscriptionLine_stddev_pop_order_by	
stddev_samp - SubscriptionLine_stddev_samp_order_by	
sum - SubscriptionLine_sum_order_by	
var_pop - SubscriptionLine_var_pop_order_by	
var_samp - SubscriptionLine_var_samp_order_by	
variance - SubscriptionLine_variance_order_by	
Example
{
  "avg": SubscriptionLine_avg_order_by,
  "count": "asc",
  "max": SubscriptionLine_max_order_by,
  "min": SubscriptionLine_min_order_by,
  "stddev": SubscriptionLine_stddev_order_by,
  "stddev_pop": SubscriptionLine_stddev_pop_order_by,
  "stddev_samp": SubscriptionLine_stddev_samp_order_by,
  "sum": SubscriptionLine_sum_order_by,
  "var_pop": SubscriptionLine_var_pop_order_by,
  "var_samp": SubscriptionLine_var_samp_order_by,
  "variance": SubscriptionLine_variance_order_by
}
Types
SubscriptionLine_avg_order_by
Description
order by avg() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_bool_exp
Description
Boolean expression to filter rows from the table "SubscriptionLine". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Discounts - Discount_bool_exp	
Group - Group_bool_exp	
OrderLineItems - OrderLineItem_bool_exp	
OriginalSellingPlan - SellingPlan_bool_exp	
PrepaidSubscription - Subscription_bool_exp	
ProductVariant - ProductVariant_bool_exp	
Subscription - Subscription_bool_exp	
_and - [SubscriptionLine_bool_exp!]	
_not - SubscriptionLine_bool_exp	
_or - [SubscriptionLine_bool_exp!]	
createdAt - timestamptz_comparison_exp	
customAttributes - jsonb_comparison_exp	
groupId - uuid_comparison_exp	
id - uuid_comparison_exp	
isPrepaid - Boolean_comparison_exp	
ordersRemaining - Int_comparison_exp	
platformId - String_comparison_exp	
prepaidSubscriptionId - uuid_comparison_exp	
priceWithoutDiscount - numeric_comparison_exp	
productVariantId - uuid_comparison_exp	
quantity - Int_comparison_exp	
reChargeId - String_comparison_exp	
removedAt - timestamptz_comparison_exp	
sellingPlanId - uuid_comparison_exp	
subscriptionId - uuid_comparison_exp	
taxable - Boolean_comparison_exp	
titleOverride - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "Discounts": Discount_bool_exp,
  "Group": Group_bool_exp,
  "OrderLineItems": OrderLineItem_bool_exp,
  "OriginalSellingPlan": SellingPlan_bool_exp,
  "PrepaidSubscription": Subscription_bool_exp,
  "ProductVariant": ProductVariant_bool_exp,
  "Subscription": Subscription_bool_exp,
  "_and": [SubscriptionLine_bool_exp],
  "_not": SubscriptionLine_bool_exp,
  "_or": [SubscriptionLine_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "customAttributes": jsonb_comparison_exp,
  "groupId": uuid_comparison_exp,
  "id": uuid_comparison_exp,
  "isPrepaid": Boolean_comparison_exp,
  "ordersRemaining": Int_comparison_exp,
  "platformId": String_comparison_exp,
  "prepaidSubscriptionId": uuid_comparison_exp,
  "priceWithoutDiscount": numeric_comparison_exp,
  "productVariantId": uuid_comparison_exp,
  "quantity": Int_comparison_exp,
  "reChargeId": String_comparison_exp,
  "removedAt": timestamptz_comparison_exp,
  "sellingPlanId": uuid_comparison_exp,
  "subscriptionId": uuid_comparison_exp,
  "taxable": Boolean_comparison_exp,
  "titleOverride": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
SubscriptionLine_max_order_by
Description
order by max() on columns of table "SubscriptionLine"

Fields
Input Field	Description
createdAt - order_by	
groupId - order_by	only ever null if stale plan and unavailable groupplan
id - order_by	
ordersRemaining - order_by	
platformId - order_by	
prepaidSubscriptionId - order_by	
priceWithoutDiscount - order_by	
productVariantId - order_by	
quantity - order_by	
reChargeId - order_by	
removedAt - order_by	
sellingPlanId - order_by	
subscriptionId - order_by	
titleOverride - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupId": "asc",
  "id": "asc",
  "ordersRemaining": "asc",
  "platformId": "asc",
  "prepaidSubscriptionId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "reChargeId": "asc",
  "removedAt": "asc",
  "sellingPlanId": "asc",
  "subscriptionId": "asc",
  "titleOverride": "asc",
  "updatedAt": "asc"
}
Types
SubscriptionLine_min_order_by
Description
order by min() on columns of table "SubscriptionLine"

Fields
Input Field	Description
createdAt - order_by	
groupId - order_by	only ever null if stale plan and unavailable groupplan
id - order_by	
ordersRemaining - order_by	
platformId - order_by	
prepaidSubscriptionId - order_by	
priceWithoutDiscount - order_by	
productVariantId - order_by	
quantity - order_by	
reChargeId - order_by	
removedAt - order_by	
sellingPlanId - order_by	
subscriptionId - order_by	
titleOverride - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "groupId": "asc",
  "id": "asc",
  "ordersRemaining": "asc",
  "platformId": "asc",
  "prepaidSubscriptionId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "reChargeId": "asc",
  "removedAt": "asc",
  "sellingPlanId": "asc",
  "subscriptionId": "asc",
  "titleOverride": "asc",
  "updatedAt": "asc"
}
Types
SubscriptionLine_order_by
Description
Ordering options when selecting data from "SubscriptionLine".

Fields
Input Field	Description
Discounts_aggregate - Discount_aggregate_order_by	
Group - Group_order_by	
OrderLineItems_aggregate - OrderLineItem_aggregate_order_by	
OriginalSellingPlan - SellingPlan_order_by	
PrepaidSubscription - Subscription_order_by	
ProductVariant - ProductVariant_order_by	
Subscription - Subscription_order_by	
createdAt - order_by	
customAttributes - order_by	
groupId - order_by	
id - order_by	
isPrepaid - order_by	
ordersRemaining - order_by	
platformId - order_by	
prepaidSubscriptionId - order_by	
priceWithoutDiscount - order_by	
productVariantId - order_by	
quantity - order_by	
reChargeId - order_by	
removedAt - order_by	
sellingPlanId - order_by	
subscriptionId - order_by	
taxable - order_by	
titleOverride - order_by	
updatedAt - order_by	
Example
{
  "Discounts_aggregate": Discount_aggregate_order_by,
  "Group": Group_order_by,
  "OrderLineItems_aggregate": OrderLineItem_aggregate_order_by,
  "OriginalSellingPlan": SellingPlan_order_by,
  "PrepaidSubscription": Subscription_order_by,
  "ProductVariant": ProductVariant_order_by,
  "Subscription": Subscription_order_by,
  "createdAt": "asc",
  "customAttributes": "asc",
  "groupId": "asc",
  "id": "asc",
  "isPrepaid": "asc",
  "ordersRemaining": "asc",
  "platformId": "asc",
  "prepaidSubscriptionId": "asc",
  "priceWithoutDiscount": "asc",
  "productVariantId": "asc",
  "quantity": "asc",
  "reChargeId": "asc",
  "removedAt": "asc",
  "sellingPlanId": "asc",
  "subscriptionId": "asc",
  "taxable": "asc",
  "titleOverride": "asc",
  "updatedAt": "asc"
}
Types
SubscriptionLine_select_column
Description
select columns of table "SubscriptionLine"

Values
Enum Value	Description
createdAt

column name
customAttributes

column name
groupId

column name
id

column name
isPrepaid

column name
ordersRemaining

column name
platformId

column name
prepaidSubscriptionId

column name
priceWithoutDiscount

column name
productVariantId

column name
quantity

column name
reChargeId

column name
removedAt

column name
sellingPlanId

column name
subscriptionId

column name
taxable

column name
titleOverride

column name
updatedAt

column name
Example
"createdAt"
Types
SubscriptionLine_stddev_order_by
Description
order by stddev() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_sum_order_by
Description
order by sum() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_var_pop_order_by
Description
order by var_pop() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_var_samp_order_by
Description
order by var_samp() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionLine_variance_order_by
Description
order by variance() on columns of table "SubscriptionLine"

Fields
Input Field	Description
ordersRemaining - order_by	
priceWithoutDiscount - order_by	
quantity - order_by	
Example
{"ordersRemaining": "asc", "priceWithoutDiscount": "asc", "quantity": "asc"}
Types
SubscriptionUpdatePaymentMethodInput
Fields
Input Field	Description
paymentMethodPlatformId - String	
subscriptionId - uuid!	
Example
{
  "paymentMethodPlatformId": "abc123",
  "subscriptionId": uuid
}
Types
SubscriptionUpdatePaymentMethodOutput
Fields
Field Name	Description
subscriptionId - uuid!	
Example
{"subscriptionId": uuid}
Types
Subscription_aggregate_order_by
Description
order by aggregate values of table "Subscription"

Fields
Input Field	Description
avg - Subscription_avg_order_by	
count - order_by	
max - Subscription_max_order_by	
min - Subscription_min_order_by	
stddev - Subscription_stddev_order_by	
stddev_pop - Subscription_stddev_pop_order_by	
stddev_samp - Subscription_stddev_samp_order_by	
sum - Subscription_sum_order_by	
var_pop - Subscription_var_pop_order_by	
var_samp - Subscription_var_samp_order_by	
variance - Subscription_variance_order_by	
Example
{
  "avg": Subscription_avg_order_by,
  "count": "asc",
  "max": Subscription_max_order_by,
  "min": Subscription_min_order_by,
  "stddev": Subscription_stddev_order_by,
  "stddev_pop": Subscription_stddev_pop_order_by,
  "stddev_samp": Subscription_stddev_samp_order_by,
  "sum": Subscription_sum_order_by,
  "var_pop": Subscription_var_pop_order_by,
  "var_samp": Subscription_var_samp_order_by,
  "variance": Subscription_variance_order_by
}
Types
Subscription_avg_order_by
Description
order by avg() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_bool_exp
Description
Boolean expression to filter rows from the table "Subscription". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
AuditLogs - AuditLog_bool_exp	
BillingPolicy - Policy_bool_exp	
CancelFlowSessions - CancelFlowSession_bool_exp	
CancelFlowV2Sessions - CancelFlowV2Session_bool_exp	
DeliveryPolicy - Policy_bool_exp	
Discounts - Discount_bool_exp	
FulfillmentOrders - Order_bool_exp	
NotificationLogs - NotificationLog_bool_exp	
PaymentMethod - PaymentMethod_bool_exp	
PrepaidDeliveryPolicy - Policy_bool_exp	
PrepaidGiftRecipient - StorefrontUser_bool_exp	
PrepaidSubscriptionLines - SubscriptionLine_bool_exp	
ShippingAddress - Address_bool_exp	
Site - Site_bool_exp	
StorefrontUser - StorefrontUser_bool_exp	
SubscriptionLines - SubscriptionLine_bool_exp	
SurpriseDelightSessions - SurpriseDelightSessions_bool_exp	
_and - [Subscription_bool_exp!]	
_not - Subscription_bool_exp	
_or - [Subscription_bool_exp!]	
billingPolicyId - uuid_comparison_exp	
cancelledAt - timestamptz_comparison_exp	
createdAt - timestamptz_comparison_exp	
currencyCode - String_comparison_exp	
customAttributes - jsonb_comparison_exp	
cyclesCompleted - Int_comparison_exp	
deliveryPolicyId - uuid_comparison_exp	
deliveryPrice - numeric_comparison_exp	
deliveryPriceOverride - Int_comparison_exp	
id - uuid_comparison_exp	
isPickup - Boolean_comparison_exp	
lastBillingAttemptAt - timestamptz_comparison_exp	
metadata - jsonb_comparison_exp	
migrationIndex - Int_comparison_exp	
nextBillingDate - timestamptz_comparison_exp	
note - String_comparison_exp	
originOrder - Order_bool_exp	
originOrderId - uuid_comparison_exp	
platformId - String_comparison_exp	
prepaidDeliveryPolicyId - uuid_comparison_exp	
prepaidProductPricesPerDelivery - jsonb_comparison_exp	
shippingAddressId - uuid_comparison_exp	
siteId - uuid_comparison_exp	
status - String_comparison_exp	
statusContext - String_comparison_exp	
storefrontUserId - uuid_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "AuditLogs": AuditLog_bool_exp,
  "BillingPolicy": Policy_bool_exp,
  "CancelFlowSessions": CancelFlowSession_bool_exp,
  "CancelFlowV2Sessions": CancelFlowV2Session_bool_exp,
  "DeliveryPolicy": Policy_bool_exp,
  "Discounts": Discount_bool_exp,
  "FulfillmentOrders": Order_bool_exp,
  "NotificationLogs": NotificationLog_bool_exp,
  "PaymentMethod": PaymentMethod_bool_exp,
  "PrepaidDeliveryPolicy": Policy_bool_exp,
  "PrepaidGiftRecipient": StorefrontUser_bool_exp,
  "PrepaidSubscriptionLines": SubscriptionLine_bool_exp,
  "ShippingAddress": Address_bool_exp,
  "Site": Site_bool_exp,
  "StorefrontUser": StorefrontUser_bool_exp,
  "SubscriptionLines": SubscriptionLine_bool_exp,
  "SurpriseDelightSessions": SurpriseDelightSessions_bool_exp,
  "_and": [Subscription_bool_exp],
  "_not": Subscription_bool_exp,
  "_or": [Subscription_bool_exp],
  "billingPolicyId": uuid_comparison_exp,
  "cancelledAt": timestamptz_comparison_exp,
  "createdAt": timestamptz_comparison_exp,
  "currencyCode": String_comparison_exp,
  "customAttributes": jsonb_comparison_exp,
  "cyclesCompleted": Int_comparison_exp,
  "deliveryPolicyId": uuid_comparison_exp,
  "deliveryPrice": numeric_comparison_exp,
  "deliveryPriceOverride": Int_comparison_exp,
  "id": uuid_comparison_exp,
  "isPickup": Boolean_comparison_exp,
  "lastBillingAttemptAt": timestamptz_comparison_exp,
  "metadata": jsonb_comparison_exp,
  "migrationIndex": Int_comparison_exp,
  "nextBillingDate": timestamptz_comparison_exp,
  "note": String_comparison_exp,
  "originOrder": Order_bool_exp,
  "originOrderId": uuid_comparison_exp,
  "platformId": String_comparison_exp,
  "prepaidDeliveryPolicyId": uuid_comparison_exp,
  "prepaidProductPricesPerDelivery": jsonb_comparison_exp,
  "shippingAddressId": uuid_comparison_exp,
  "siteId": uuid_comparison_exp,
  "status": String_comparison_exp,
  "statusContext": String_comparison_exp,
  "storefrontUserId": uuid_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
Subscription_max_order_by
Description
order by max() on columns of table "Subscription"

Fields
Input Field	Description
billingPolicyId - order_by	
cancelledAt - order_by	
createdAt - order_by	
currencyCode - order_by	
cyclesCompleted - order_by	
deliveryPolicyId - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
id - order_by	
lastBillingAttemptAt - order_by	
migrationIndex - order_by	
nextBillingDate - order_by	
note - order_by	
originOrderId - order_by	
platformId - order_by	
prepaidDeliveryPolicyId - order_by	
shippingAddressId - order_by	
siteId - order_by	
status - order_by	
statusContext - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "billingPolicyId": "asc",
  "cancelledAt": "asc",
  "createdAt": "asc",
  "currencyCode": "asc",
  "cyclesCompleted": "asc",
  "deliveryPolicyId": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "id": "asc",
  "lastBillingAttemptAt": "asc",
  "migrationIndex": "asc",
  "nextBillingDate": "asc",
  "note": "asc",
  "originOrderId": "asc",
  "platformId": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "shippingAddressId": "asc",
  "siteId": "asc",
  "status": "asc",
  "statusContext": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
Subscription_min_order_by
Description
order by min() on columns of table "Subscription"

Fields
Input Field	Description
billingPolicyId - order_by	
cancelledAt - order_by	
createdAt - order_by	
currencyCode - order_by	
cyclesCompleted - order_by	
deliveryPolicyId - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
id - order_by	
lastBillingAttemptAt - order_by	
migrationIndex - order_by	
nextBillingDate - order_by	
note - order_by	
originOrderId - order_by	
platformId - order_by	
prepaidDeliveryPolicyId - order_by	
shippingAddressId - order_by	
siteId - order_by	
status - order_by	
statusContext - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "billingPolicyId": "asc",
  "cancelledAt": "asc",
  "createdAt": "asc",
  "currencyCode": "asc",
  "cyclesCompleted": "asc",
  "deliveryPolicyId": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "id": "asc",
  "lastBillingAttemptAt": "asc",
  "migrationIndex": "asc",
  "nextBillingDate": "asc",
  "note": "asc",
  "originOrderId": "asc",
  "platformId": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "shippingAddressId": "asc",
  "siteId": "asc",
  "status": "asc",
  "statusContext": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
Subscription_order_by
Description
Ordering options when selecting data from "Subscription".

Fields
Input Field	Description
AuditLogs_aggregate - AuditLog_aggregate_order_by	
BillingPolicy - Policy_order_by	
CancelFlowSessions_aggregate - CancelFlowSession_aggregate_order_by	
CancelFlowV2Sessions_aggregate - CancelFlowV2Session_aggregate_order_by	
DeliveryPolicy - Policy_order_by	
Discounts_aggregate - Discount_aggregate_order_by	
FulfillmentOrders_aggregate - Order_aggregate_order_by	
NotificationLogs_aggregate - NotificationLog_aggregate_order_by	
PaymentMethod - PaymentMethod_order_by	
PrepaidDeliveryPolicy - Policy_order_by	
PrepaidGiftRecipient - StorefrontUser_order_by	
PrepaidSubscriptionLines_aggregate - SubscriptionLine_aggregate_order_by	
ShippingAddress - Address_order_by	
Site - Site_order_by	
StorefrontUser - StorefrontUser_order_by	
SubscriptionLines_aggregate - SubscriptionLine_aggregate_order_by	
SurpriseDelightSessions_aggregate - SurpriseDelightSessions_aggregate_order_by	
billingPolicyId - order_by	
cancelledAt - order_by	
createdAt - order_by	
currencyCode - order_by	
customAttributes - order_by	
cyclesCompleted - order_by	
deliveryPolicyId - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
id - order_by	
isPickup - order_by	
lastBillingAttemptAt - order_by	
metadata - order_by	
migrationIndex - order_by	
nextBillingDate - order_by	
note - order_by	
originOrder - Order_order_by	
originOrderId - order_by	
platformId - order_by	
prepaidDeliveryPolicyId - order_by	
prepaidProductPricesPerDelivery - order_by	
shippingAddressId - order_by	
siteId - order_by	
status - order_by	
statusContext - order_by	
storefrontUserId - order_by	
updatedAt - order_by	
Example
{
  "AuditLogs_aggregate": AuditLog_aggregate_order_by,
  "BillingPolicy": Policy_order_by,
  "CancelFlowSessions_aggregate": CancelFlowSession_aggregate_order_by,
  "CancelFlowV2Sessions_aggregate": CancelFlowV2Session_aggregate_order_by,
  "DeliveryPolicy": Policy_order_by,
  "Discounts_aggregate": Discount_aggregate_order_by,
  "FulfillmentOrders_aggregate": Order_aggregate_order_by,
  "NotificationLogs_aggregate": NotificationLog_aggregate_order_by,
  "PaymentMethod": PaymentMethod_order_by,
  "PrepaidDeliveryPolicy": Policy_order_by,
  "PrepaidGiftRecipient": StorefrontUser_order_by,
  "PrepaidSubscriptionLines_aggregate": SubscriptionLine_aggregate_order_by,
  "ShippingAddress": Address_order_by,
  "Site": Site_order_by,
  "StorefrontUser": StorefrontUser_order_by,
  "SubscriptionLines_aggregate": SubscriptionLine_aggregate_order_by,
  "SurpriseDelightSessions_aggregate": SurpriseDelightSessions_aggregate_order_by,
  "billingPolicyId": "asc",
  "cancelledAt": "asc",
  "createdAt": "asc",
  "currencyCode": "asc",
  "customAttributes": "asc",
  "cyclesCompleted": "asc",
  "deliveryPolicyId": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "id": "asc",
  "isPickup": "asc",
  "lastBillingAttemptAt": "asc",
  "metadata": "asc",
  "migrationIndex": "asc",
  "nextBillingDate": "asc",
  "note": "asc",
  "originOrder": Order_order_by,
  "originOrderId": "asc",
  "platformId": "asc",
  "prepaidDeliveryPolicyId": "asc",
  "prepaidProductPricesPerDelivery": "asc",
  "shippingAddressId": "asc",
  "siteId": "asc",
  "status": "asc",
  "statusContext": "asc",
  "storefrontUserId": "asc",
  "updatedAt": "asc"
}
Types
Subscription_select_column
Description
select columns of table "Subscription"

Values
Enum Value	Description
billingPolicyId

column name
cancelledAt

column name
createdAt

column name
currencyCode

column name
customAttributes

column name
cyclesCompleted

column name
deliveryPolicyId

column name
deliveryPrice

column name
deliveryPriceOverride

column name
id

column name
isPickup

column name
lastBillingAttemptAt

column name
metadata

column name
migrationIndex

column name
nextBillingDate

column name
note

column name
originOrderId

column name
platformId

column name
prepaidDeliveryPolicyId

column name
prepaidProductPricesPerDelivery

column name
shippingAddressId

column name
siteId

column name
status

column name
statusContext

column name
storefrontUserId

column name
updatedAt

column name
Example
"billingPolicyId"
Types
Subscription_stddev_order_by
Description
order by stddev() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_sum_order_by
Description
order by sum() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_var_pop_order_by
Description
order by var_pop() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_var_samp_order_by
Description
order by var_samp() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
Subscription_variance_order_by
Description
order by variance() on columns of table "Subscription"

Fields
Input Field	Description
cyclesCompleted - order_by	
deliveryPrice - order_by	
deliveryPriceOverride - order_by	
migrationIndex - order_by	
Example
{
  "cyclesCompleted": "asc",
  "deliveryPrice": "asc",
  "deliveryPriceOverride": "asc",
  "migrationIndex": "asc"
}
Types
SurpriseDelightSessions
Description
Record of when a surprise and delight rule is applied

Fields
Field Name	Description
Subscription - Subscription!	An object relationship
created_at - timestamptz!	
group - String!	
id - uuid!	
ruleId - uuid!	
subscriptionId - uuid!	
Example
{
  "Subscription": Subscription,
  "created_at": timestamptz,
  "group": "xyz789",
  "id": uuid,
  "ruleId": uuid,
  "subscriptionId": uuid
}
Types
SurpriseDelightSessions_aggregate_order_by
Description
order by aggregate values of table "SurpriseDelightSessions"

Fields
Input Field	Description
count - order_by	
max - SurpriseDelightSessions_max_order_by	
min - SurpriseDelightSessions_min_order_by	
Example
{
  "count": "asc",
  "max": SurpriseDelightSessions_max_order_by,
  "min": SurpriseDelightSessions_min_order_by
}
Types
SurpriseDelightSessions_bool_exp
Description
Boolean expression to filter rows from the table "SurpriseDelightSessions". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Subscription - Subscription_bool_exp	
_and - [SurpriseDelightSessions_bool_exp!]	
_not - SurpriseDelightSessions_bool_exp	
_or - [SurpriseDelightSessions_bool_exp!]	
created_at - timestamptz_comparison_exp	
group - String_comparison_exp	
id - uuid_comparison_exp	
ruleId - uuid_comparison_exp	
subscriptionId - uuid_comparison_exp	
Example
{
  "Subscription": Subscription_bool_exp,
  "_and": [SurpriseDelightSessions_bool_exp],
  "_not": SurpriseDelightSessions_bool_exp,
  "_or": [SurpriseDelightSessions_bool_exp],
  "created_at": timestamptz_comparison_exp,
  "group": String_comparison_exp,
  "id": uuid_comparison_exp,
  "ruleId": uuid_comparison_exp,
  "subscriptionId": uuid_comparison_exp
}
Types
SurpriseDelightSessions_max_order_by
Description
order by max() on columns of table "SurpriseDelightSessions"

Fields
Input Field	Description
created_at - order_by	
group - order_by	
id - order_by	
ruleId - order_by	
subscriptionId - order_by	
Example
{
  "created_at": "asc",
  "group": "asc",
  "id": "asc",
  "ruleId": "asc",
  "subscriptionId": "asc"
}
Types
SurpriseDelightSessions_min_order_by
Description
order by min() on columns of table "SurpriseDelightSessions"

Fields
Input Field	Description
created_at - order_by	
group - order_by	
id - order_by	
ruleId - order_by	
subscriptionId - order_by	
Example
{
  "created_at": "asc",
  "group": "asc",
  "id": "asc",
  "ruleId": "asc",
  "subscriptionId": "asc"
}
Types
SurpriseDelightSessions_order_by
Description
Ordering options when selecting data from "SurpriseDelightSessions".

Fields
Input Field	Description
Subscription - Subscription_order_by	
created_at - order_by	
group - order_by	
id - order_by	
ruleId - order_by	
subscriptionId - order_by	
Example
{
  "Subscription": Subscription_order_by,
  "created_at": "asc",
  "group": "asc",
  "id": "asc",
  "ruleId": "asc",
  "subscriptionId": "asc"
}
Types
SurpriseDelightSessions_select_column
Description
select columns of table "SurpriseDelightSessions"

Values
Enum Value	Description
created_at

column name
group

column name
id

column name
ruleId

column name
subscriptionId

column name
Example
"created_at"
Types
SwapPricingOptionType
Values
Enum Value	Description
CUSTOM

NEW_VARIANT_PRICE

SAME

Example
"CUSTOM"
Types
SwapSubscriptionProductVariantsInput
Fields
Input Field	Description
newCustomPrice - String	
newProductVariantId - String!	
oldProductVariantId - String!	
pricingOption - SwapPricingOptionType	
subscriptionId - String!	
Example
{
  "newCustomPrice": "abc123",
  "newProductVariantId": "xyz789",
  "oldProductVariantId": "xyz789",
  "pricingOption": "CUSTOM",
  "subscriptionId": "abc123"
}
Types
SwapSubscriptionProductVariantsOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": true}
Types
TaxLine
Description
columns and relationships of "TaxLine"

Fields
Field Name	Description
OrderLineItem - OrderLineItem	An object relationship
ShippingLine - ShippingLine	An object relationship
createdAt - timestamptz!	
id - uuid!	
orderLineItemId - uuid	
price - numeric!	
rate - numeric!	
shippingLineId - uuid	
title - String!	
updatedAt - timestamptz!	
Example
{
  "OrderLineItem": OrderLineItem,
  "ShippingLine": ShippingLine,
  "createdAt": timestamptz,
  "id": uuid,
  "orderLineItemId": uuid,
  "price": numeric,
  "rate": numeric,
  "shippingLineId": uuid,
  "title": "abc123",
  "updatedAt": timestamptz
}
Types
TaxLine_aggregate_order_by
Description
order by aggregate values of table "TaxLine"

Fields
Input Field	Description
avg - TaxLine_avg_order_by	
count - order_by	
max - TaxLine_max_order_by	
min - TaxLine_min_order_by	
stddev - TaxLine_stddev_order_by	
stddev_pop - TaxLine_stddev_pop_order_by	
stddev_samp - TaxLine_stddev_samp_order_by	
sum - TaxLine_sum_order_by	
var_pop - TaxLine_var_pop_order_by	
var_samp - TaxLine_var_samp_order_by	
variance - TaxLine_variance_order_by	
Example
{
  "avg": TaxLine_avg_order_by,
  "count": "asc",
  "max": TaxLine_max_order_by,
  "min": TaxLine_min_order_by,
  "stddev": TaxLine_stddev_order_by,
  "stddev_pop": TaxLine_stddev_pop_order_by,
  "stddev_samp": TaxLine_stddev_samp_order_by,
  "sum": TaxLine_sum_order_by,
  "var_pop": TaxLine_var_pop_order_by,
  "var_samp": TaxLine_var_samp_order_by,
  "variance": TaxLine_variance_order_by
}
Types
TaxLine_avg_order_by
Description
order by avg() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_bool_exp
Description
Boolean expression to filter rows from the table "TaxLine". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
OrderLineItem - OrderLineItem_bool_exp	
ShippingLine - ShippingLine_bool_exp	
_and - [TaxLine_bool_exp!]	
_not - TaxLine_bool_exp	
_or - [TaxLine_bool_exp!]	
createdAt - timestamptz_comparison_exp	
id - uuid_comparison_exp	
orderLineItemId - uuid_comparison_exp	
price - numeric_comparison_exp	
rate - numeric_comparison_exp	
shippingLineId - uuid_comparison_exp	
title - String_comparison_exp	
updatedAt - timestamptz_comparison_exp	
Example
{
  "OrderLineItem": OrderLineItem_bool_exp,
  "ShippingLine": ShippingLine_bool_exp,
  "_and": [TaxLine_bool_exp],
  "_not": TaxLine_bool_exp,
  "_or": [TaxLine_bool_exp],
  "createdAt": timestamptz_comparison_exp,
  "id": uuid_comparison_exp,
  "orderLineItemId": uuid_comparison_exp,
  "price": numeric_comparison_exp,
  "rate": numeric_comparison_exp,
  "shippingLineId": uuid_comparison_exp,
  "title": String_comparison_exp,
  "updatedAt": timestamptz_comparison_exp
}
Types
TaxLine_max_order_by
Description
order by max() on columns of table "TaxLine"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
orderLineItemId - order_by	
price - order_by	
rate - order_by	
shippingLineId - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "orderLineItemId": "asc",
  "price": "asc",
  "rate": "asc",
  "shippingLineId": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
TaxLine_min_order_by
Description
order by min() on columns of table "TaxLine"

Fields
Input Field	Description
createdAt - order_by	
id - order_by	
orderLineItemId - order_by	
price - order_by	
rate - order_by	
shippingLineId - order_by	
title - order_by	
updatedAt - order_by	
Example
{
  "createdAt": "asc",
  "id": "asc",
  "orderLineItemId": "asc",
  "price": "asc",
  "rate": "asc",
  "shippingLineId": "asc",
  "title": "asc",
  "updatedAt": "asc"
}
Types
TaxLine_stddev_order_by
Description
order by stddev() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_stddev_pop_order_by
Description
order by stddev_pop() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_stddev_samp_order_by
Description
order by stddev_samp() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_sum_order_by
Description
order by sum() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_var_pop_order_by
Description
order by var_pop() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_var_samp_order_by
Description
order by var_samp() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
TaxLine_variance_order_by
Description
order by variance() on columns of table "TaxLine"

Fields
Input Field	Description
price - order_by	
rate - order_by	
Example
{"price": "asc", "rate": "asc"}
Types
Theme
Description
columns and relationships of "Theme"

Fields
Field Name	Description
Site - Site!	An object relationship
id - uuid!	
Example
{"Site": Site, "id": uuid}
Types
Theme2
Description
columns and relationships of "Theme2"

Fields
Field Name	Description
Site - Site	An object relationship
accentTextColor - String	
badgeBGColor - String	
badgeTextColor - String	
buttonBGColor - String	
buttonBorderRadius - numeric	
buttonTextColor - String	
cardBorderRadius - numeric	
cardBorderWidth - numeric	
carouselSlideSeconds - Int	
disableHalfSkip - Boolean	
expandAllButtons - Boolean	
headingColor - String	
headingWeight - String	
hideQuantityEditing - Boolean	
id - uuid!	
isPreview - Boolean!	
loyaltyGradientEndColor - String	
loyaltyGradientStartColor - String	
loyaltyIconBgColor - String	
loyaltyIconColor - String	
neverHideOTUCards - Boolean	
noSecondaryButtons - Boolean	
qaPrimaryAccentColor - String	
qaSecondaryAccentColor - String	
radioBorderRadius - numeric	
showTaxAndDuties - Boolean	
siteId - uuid	
tagBGColor - String	
tagBorderRadius - numeric	
tagTextColor - String	
textAnchorColor - String	
textApplyDiscountCode - String	
textCancelNow - String	
textColor - String	
textEditFrequency - String	
textOrderNow - String	
textWeight - String	
updated_at - timestamptz!	
Example
{
  "Site": Site,
  "accentTextColor": "xyz789",
  "badgeBGColor": "abc123",
  "badgeTextColor": "xyz789",
  "buttonBGColor": "xyz789",
  "buttonBorderRadius": numeric,
  "buttonTextColor": "abc123",
  "cardBorderRadius": numeric,
  "cardBorderWidth": numeric,
  "carouselSlideSeconds": 123,
  "disableHalfSkip": false,
  "expandAllButtons": false,
  "headingColor": "xyz789",
  "headingWeight": "xyz789",
  "hideQuantityEditing": false,
  "id": uuid,
  "isPreview": false,
  "loyaltyGradientEndColor": "abc123",
  "loyaltyGradientStartColor": "abc123",
  "loyaltyIconBgColor": "xyz789",
  "loyaltyIconColor": "xyz789",
  "neverHideOTUCards": false,
  "noSecondaryButtons": false,
  "qaPrimaryAccentColor": "xyz789",
  "qaSecondaryAccentColor": "abc123",
  "radioBorderRadius": numeric,
  "showTaxAndDuties": true,
  "siteId": uuid,
  "tagBGColor": "xyz789",
  "tagBorderRadius": numeric,
  "tagTextColor": "abc123",
  "textAnchorColor": "abc123",
  "textApplyDiscountCode": "abc123",
  "textCancelNow": "abc123",
  "textColor": "abc123",
  "textEditFrequency": "xyz789",
  "textOrderNow": "abc123",
  "textWeight": "abc123",
  "updated_at": timestamptz
}
Types
Theme2_bool_exp
Description
Boolean expression to filter rows from the table "Theme2". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Site - Site_bool_exp	
_and - [Theme2_bool_exp!]	
_not - Theme2_bool_exp	
_or - [Theme2_bool_exp!]	
accentTextColor - String_comparison_exp	
badgeBGColor - String_comparison_exp	
badgeTextColor - String_comparison_exp	
buttonBGColor - String_comparison_exp	
buttonBorderRadius - numeric_comparison_exp	
buttonTextColor - String_comparison_exp	
cardBorderRadius - numeric_comparison_exp	
cardBorderWidth - numeric_comparison_exp	
carouselSlideSeconds - Int_comparison_exp	
disableHalfSkip - Boolean_comparison_exp	
expandAllButtons - Boolean_comparison_exp	
headingColor - String_comparison_exp	
headingWeight - String_comparison_exp	
hideQuantityEditing - Boolean_comparison_exp	
id - uuid_comparison_exp	
isPreview - Boolean_comparison_exp	
loyaltyGradientEndColor - String_comparison_exp	
loyaltyGradientStartColor - String_comparison_exp	
loyaltyIconBgColor - String_comparison_exp	
loyaltyIconColor - String_comparison_exp	
neverHideOTUCards - Boolean_comparison_exp	
noSecondaryButtons - Boolean_comparison_exp	
qaPrimaryAccentColor - String_comparison_exp	
qaSecondaryAccentColor - String_comparison_exp	
radioBorderRadius - numeric_comparison_exp	
showTaxAndDuties - Boolean_comparison_exp	
siteId - uuid_comparison_exp	
tagBGColor - String_comparison_exp	
tagBorderRadius - numeric_comparison_exp	
tagTextColor - String_comparison_exp	
textAnchorColor - String_comparison_exp	
textApplyDiscountCode - String_comparison_exp	
textCancelNow - String_comparison_exp	
textColor - String_comparison_exp	
textEditFrequency - String_comparison_exp	
textOrderNow - String_comparison_exp	
textWeight - String_comparison_exp	
updated_at - timestamptz_comparison_exp	
Example
{
  "Site": Site_bool_exp,
  "_and": [Theme2_bool_exp],
  "_not": Theme2_bool_exp,
  "_or": [Theme2_bool_exp],
  "accentTextColor": String_comparison_exp,
  "badgeBGColor": String_comparison_exp,
  "badgeTextColor": String_comparison_exp,
  "buttonBGColor": String_comparison_exp,
  "buttonBorderRadius": numeric_comparison_exp,
  "buttonTextColor": String_comparison_exp,
  "cardBorderRadius": numeric_comparison_exp,
  "cardBorderWidth": numeric_comparison_exp,
  "carouselSlideSeconds": Int_comparison_exp,
  "disableHalfSkip": Boolean_comparison_exp,
  "expandAllButtons": Boolean_comparison_exp,
  "headingColor": String_comparison_exp,
  "headingWeight": String_comparison_exp,
  "hideQuantityEditing": Boolean_comparison_exp,
  "id": uuid_comparison_exp,
  "isPreview": Boolean_comparison_exp,
  "loyaltyGradientEndColor": String_comparison_exp,
  "loyaltyGradientStartColor": String_comparison_exp,
  "loyaltyIconBgColor": String_comparison_exp,
  "loyaltyIconColor": String_comparison_exp,
  "neverHideOTUCards": Boolean_comparison_exp,
  "noSecondaryButtons": Boolean_comparison_exp,
  "qaPrimaryAccentColor": String_comparison_exp,
  "qaSecondaryAccentColor": String_comparison_exp,
  "radioBorderRadius": numeric_comparison_exp,
  "showTaxAndDuties": Boolean_comparison_exp,
  "siteId": uuid_comparison_exp,
  "tagBGColor": String_comparison_exp,
  "tagBorderRadius": numeric_comparison_exp,
  "tagTextColor": String_comparison_exp,
  "textAnchorColor": String_comparison_exp,
  "textApplyDiscountCode": String_comparison_exp,
  "textCancelNow": String_comparison_exp,
  "textColor": String_comparison_exp,
  "textEditFrequency": String_comparison_exp,
  "textOrderNow": String_comparison_exp,
  "textWeight": String_comparison_exp,
  "updated_at": timestamptz_comparison_exp
}
Types
Theme2_order_by
Description
Ordering options when selecting data from "Theme2".

Fields
Input Field	Description
Site - Site_order_by	
accentTextColor - order_by	
badgeBGColor - order_by	
badgeTextColor - order_by	
buttonBGColor - order_by	
buttonBorderRadius - order_by	
buttonTextColor - order_by	
cardBorderRadius - order_by	
cardBorderWidth - order_by	
carouselSlideSeconds - order_by	
disableHalfSkip - order_by	
expandAllButtons - order_by	
headingColor - order_by	
headingWeight - order_by	
hideQuantityEditing - order_by	
id - order_by	
isPreview - order_by	
loyaltyGradientEndColor - order_by	
loyaltyGradientStartColor - order_by	
loyaltyIconBgColor - order_by	
loyaltyIconColor - order_by	
neverHideOTUCards - order_by	
noSecondaryButtons - order_by	
qaPrimaryAccentColor - order_by	
qaSecondaryAccentColor - order_by	
radioBorderRadius - order_by	
showTaxAndDuties - order_by	
siteId - order_by	
tagBGColor - order_by	
tagBorderRadius - order_by	
tagTextColor - order_by	
textAnchorColor - order_by	
textApplyDiscountCode - order_by	
textCancelNow - order_by	
textColor - order_by	
textEditFrequency - order_by	
textOrderNow - order_by	
textWeight - order_by	
updated_at - order_by	
Example
{
  "Site": Site_order_by,
  "accentTextColor": "asc",
  "badgeBGColor": "asc",
  "badgeTextColor": "asc",
  "buttonBGColor": "asc",
  "buttonBorderRadius": "asc",
  "buttonTextColor": "asc",
  "cardBorderRadius": "asc",
  "cardBorderWidth": "asc",
  "carouselSlideSeconds": "asc",
  "disableHalfSkip": "asc",
  "expandAllButtons": "asc",
  "headingColor": "asc",
  "headingWeight": "asc",
  "hideQuantityEditing": "asc",
  "id": "asc",
  "isPreview": "asc",
  "loyaltyGradientEndColor": "asc",
  "loyaltyGradientStartColor": "asc",
  "loyaltyIconBgColor": "asc",
  "loyaltyIconColor": "asc",
  "neverHideOTUCards": "asc",
  "noSecondaryButtons": "asc",
  "qaPrimaryAccentColor": "asc",
  "qaSecondaryAccentColor": "asc",
  "radioBorderRadius": "asc",
  "showTaxAndDuties": "asc",
  "siteId": "asc",
  "tagBGColor": "asc",
  "tagBorderRadius": "asc",
  "tagTextColor": "asc",
  "textAnchorColor": "asc",
  "textApplyDiscountCode": "asc",
  "textCancelNow": "asc",
  "textColor": "asc",
  "textEditFrequency": "asc",
  "textOrderNow": "asc",
  "textWeight": "asc",
  "updated_at": "asc"
}
Types
Theme_bool_exp
Description
Boolean expression to filter rows from the table "Theme". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
Site - Site_bool_exp	
_and - [Theme_bool_exp!]	
_not - Theme_bool_exp	
_or - [Theme_bool_exp!]	
id - uuid_comparison_exp	
Example
{
  "Site": Site_bool_exp,
  "_and": [Theme_bool_exp],
  "_not": Theme_bool_exp,
  "_or": [Theme_bool_exp],
  "id": uuid_comparison_exp
}
Types
Theme_order_by
Description
Ordering options when selecting data from "Theme".

Fields
Input Field	Description
Site - Site_order_by	
id - order_by	
Example
{"Site": Site_order_by, "id": "asc"}
Types
UpdateDynamicBoxSubscriptionInput
Fields
Input Field	Description
dynamicBox - DynamicBoxConfigInput!	
original - [DynamicBoxContentInput!]!	
subscriptionId - uuid!	
updated - [DynamicBoxContentInput!]!	
Example
{
  "dynamicBox": DynamicBoxConfigInput,
  "original": [DynamicBoxContentInput],
  "subscriptionId": uuid,
  "updated": [DynamicBoxContentInput]
}
Types
UpdateDynamicBoxSubscriptionOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": false}
Types
UpdateNextBillingDateInput
Fields
Input Field	Description
date - String!	
subscriptionId - uuid!	
Example
{
  "date": "xyz789",
  "subscriptionId": uuid
}
Types
UpdateNextBillingDateOutput
Fields
Field Name	Description
message - String!	
ok - Boolean!	
Example
{"message": "xyz789", "ok": false}
Types
UpdateSubscriptionLineInput
Fields
Input Field	Description
currentPrice - Float	
prepaidSubscriptionLineId - uuid	
productVariantId - uuid	
quantity - Int	
subscriptionLineId - uuid	
titleOverride - String	
Example
{
  "currentPrice": 987.65,
  "prepaidSubscriptionLineId": uuid,
  "productVariantId": uuid,
  "quantity": 123,
  "subscriptionLineId": uuid,
  "titleOverride": "xyz789"
}
Types
UpdateSubscriptionLineOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": true}
Types
UpdateSubscriptionNoteInput
Fields
Input Field	Description
note - String	
subscriptionId - String!	
Example
{
  "note": "abc123",
  "subscriptionId": "xyz789"
}
Types
UpdateSubscriptionNoteOutput
Fields
Field Name	Description
note - String	
ok - Boolean!	
Example
{"note": "abc123", "ok": true}
Types
UpdateSubscriptionShippingAddressInput
Fields
Input Field	Description
address1 - String	
address2 - String	
city - String	
company - String	
country - String	
doorCode - String	
firstName - String	
lastName - String	
phone - String	
province - String	
subscriptionId - String!	
zip - String	
Example
{
  "address1": "xyz789",
  "address2": "abc123",
  "city": "abc123",
  "company": "abc123",
  "country": "xyz789",
  "doorCode": "abc123",
  "firstName": "xyz789",
  "lastName": "abc123",
  "phone": "abc123",
  "province": "xyz789",
  "subscriptionId": "abc123",
  "zip": "abc123"
}
Types
UpdateSubscriptionShippingAddressOutput
Fields
Field Name	Description
message - String	
ok - Boolean!	
Example
{"message": "xyz789", "ok": false}
Types
User
Description
Do not let dashboard users infer storefront <> user <> marketplace links.

Fields
Field Name	Description
StorefrontUsers - [StorefrontUser!]!	An array relationship
id - uuid!	
Example
{
  "StorefrontUsers": [StorefrontUser],
  "id": uuid
}
Types
User_bool_exp
Description
Boolean expression to filter rows from the table "User". All fields are combined with a logical 'AND'.

Fields
Input Field	Description
StorefrontUsers - StorefrontUser_bool_exp	
_and - [User_bool_exp!]	
_not - User_bool_exp	
_or - [User_bool_exp!]	
id - uuid_comparison_exp	
Example
{
  "StorefrontUsers": StorefrontUser_bool_exp,
  "_and": [User_bool_exp],
  "_not": User_bool_exp,
  "_or": [User_bool_exp],
  "id": uuid_comparison_exp
}
Types
User_order_by
Description
Ordering options when selecting data from "User".

Fields
Input Field	Description
StorefrontUsers_aggregate - StorefrontUser_aggregate_order_by	
id - order_by	
Example
{
  "StorefrontUsers_aggregate": StorefrontUser_aggregate_order_by,
  "id": "asc"
}
Types
addProductVariantToSellingPlanGroupInput
Fields
Input Field	Description
productVariantId - uuid!	
sellingPlanGroupId - uuid!	
Example
{
  "productVariantId": uuid,
  "sellingPlanGroupId": uuid
}
Types
addProductVariantToSellingPlanGroupOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": false}
Types
jsonb
Example
jsonb
Types
jsonb_cast_exp
Fields
Input Field	Description
String - String_comparison_exp	
Example
{"String": String_comparison_exp}
Types
jsonb_comparison_exp
Description
Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_cast - jsonb_cast_exp	
_contained_in - jsonb	is the column contained in the given json value
_contains - jsonb	does the column contain the given json value at the top level
_eq - jsonb	
_gt - jsonb	
_gte - jsonb	
_has_key - String	does the string exist as a top-level key in the column
_has_keys_all - [String!]	do all of these strings exist as top-level keys in the column
_has_keys_any - [String!]	do any of these strings exist as top-level keys in the column
_in - [jsonb!]	
_is_null - Boolean	
_lt - jsonb	
_lte - jsonb	
_neq - jsonb	
_nin - [jsonb!]	
Example
{
  "_cast": jsonb_cast_exp,
  "_contained_in": jsonb,
  "_contains": jsonb,
  "_eq": jsonb,
  "_gt": jsonb,
  "_gte": jsonb,
  "_has_key": "xyz789",
  "_has_keys_all": ["xyz789"],
  "_has_keys_any": ["xyz789"],
  "_in": [jsonb],
  "_is_null": false,
  "_lt": jsonb,
  "_lte": jsonb,
  "_neq": jsonb,
  "_nin": [jsonb]
}
Types
numeric
Example
numeric
Types
numeric_comparison_exp
Description
Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - numeric	
_gt - numeric	
_gte - numeric	
_in - [numeric!]	
_is_null - Boolean	
_lt - numeric	
_lte - numeric	
_neq - numeric	
_nin - [numeric!]	
Example
{
  "_eq": numeric,
  "_gt": numeric,
  "_gte": numeric,
  "_in": [numeric],
  "_is_null": false,
  "_lt": numeric,
  "_lte": numeric,
  "_neq": numeric,
  "_nin": [numeric]
}
Types
order_by
Description
column ordering options

Values
Enum Value	Description
asc

in ascending order, nulls last
asc_nulls_first

in ascending order, nulls first
asc_nulls_last

in ascending order, nulls last
desc

in descending order, nulls first
desc_nulls_first

in descending order, nulls first
desc_nulls_last

in descending order, nulls last
Example
"asc"
Types
pauseSubscriptionInput
Fields
Input Field	Description
skipOption - SkipOption	
subscriptionId - String!	
Example
{
  "skipOption": SkipOption,
  "subscriptionId": "abc123"
}
Types
pauseSubscriptionOutput
Fields
Field Name	Description
message - String!	
ok - Boolean!	
Example
{"message": "xyz789", "ok": true}
Types
removeProductVariantFromSellingPlanGroupInput
Fields
Input Field	Description
productVariantId - uuid!	
sellingPlanGroupId - uuid!	
Example
{
  "productVariantId": uuid,
  "sellingPlanGroupId": uuid
}
Types
removeProductVariantFromSellingPlanGroupOutput
Fields
Field Name	Description
ok - Boolean!	
Example
{"ok": true}
Types
timestamp
Example
timestamp
Types
timestamp_comparison_exp
Description
Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - timestamp	
_gt - timestamp	
_gte - timestamp	
_in - [timestamp!]	
_is_null - Boolean	
_lt - timestamp	
_lte - timestamp	
_neq - timestamp	
_nin - [timestamp!]	
Example
{
  "_eq": timestamp,
  "_gt": timestamp,
  "_gte": timestamp,
  "_in": [timestamp],
  "_is_null": false,
  "_lt": timestamp,
  "_lte": timestamp,
  "_neq": timestamp,
  "_nin": [timestamp]
}
Types
timestamptz
Example
timestamptz
Types
timestamptz_comparison_exp
Description
Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - timestamptz	
_gt - timestamptz	
_gte - timestamptz	
_in - [timestamptz!]	
_is_null - Boolean	
_lt - timestamptz	
_lte - timestamptz	
_neq - timestamptz	
_nin - [timestamptz!]	
Example
{
  "_eq": timestamptz,
  "_gt": timestamptz,
  "_gte": timestamptz,
  "_in": [timestamptz],
  "_is_null": false,
  "_lt": timestamptz,
  "_lte": timestamptz,
  "_neq": timestamptz,
  "_nin": [timestamptz]
}
Types
unpauseSubscriptionInput
Fields
Input Field	Description
isTemporaryPause - Boolean	
subscriptionId - String!	
Example
{
  "isTemporaryPause": false,
  "subscriptionId": "abc123"
}
Types
unpauseSubscriptionOutput
Fields
Field Name	Description
message - String!	
ok - Boolean!	
Example
{"message": "abc123", "ok": false}
Types
uuid
Example
uuid
Types
uuid_comparison_exp
Description
Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'.

Fields
Input Field	Description
_eq - uuid	
_gt - uuid	
_gte - uuid	
_in - [uuid!]	
_is_null - Boolean	
_lt - uuid	
_lte - uuid	
_neq - uuid	
_nin - [uuid!]	
Example
{
  "_eq": uuid,
  "_gt": uuid,
  "_gte": uuid,
  "_in": [uuid],
  "_is_null": true,
  "_lt": uuid,
  "_lte": uuid,
  "_neq": uuid,
  "_nin": [uuid]
}
