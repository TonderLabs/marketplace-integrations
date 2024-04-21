## Classes

<dl>
<dt><a href="#Integration">Integration</a></dt>
<dd><p>Abstract class that must be implemented by all integrations.</p>
</dd>
<dt><a href="#IntegrationMapper">IntegrationMapper</a></dt>
<dd><p>A class that maps integration keys to their handlers.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#PriceDenominationType">PriceDenominationType</a></dt>
<dd><p>Represents the type of price denomination.</p>
</dd>
<dt><a href="#FieldInputType">FieldInputType</a></dt>
<dd><p>Represents the type of field input.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#getIntegration">getIntegration(integrationKey)</a> ⇒</dt>
<dd><p>Get an integration instance from its key.</p>
</dd>
<dt><a href="#integrationFromWebhookPayload">integrationFromWebhookPayload(payload, config)</a> ⇒</dt>
<dd><p>Find an integration instance that can handle a webhook payload.</p>
</dd>
<dt><a href="#handleWebhook">handleWebhook(payload, config)</a> ⇒</dt>
<dd><p>Handle a webhook.</p>
</dd>
</dl>

<a name="Integration"></a>

## Integration
Abstract class that must be implemented by all integrations.

**Kind**: global class  
<a name="new_Integration_new"></a>

### new Integration(config)
Constructor for the integration.


| Param | Description |
| --- | --- |
| config | The configuration variables passed from the application. |

<a name="IntegrationMapper"></a>

## IntegrationMapper
A class that maps integration keys to their handlers.

**Kind**: global class  

* [IntegrationMapper](#IntegrationMapper)
    * [new IntegrationMapper(config)](#new_IntegrationMapper_new)
    * [.getData(integrationKey, pagination, requestQueryParams)](#IntegrationMapper+getData) ⇒
    * [.submitData(integrationKey, data)](#IntegrationMapper+submitData) ⇒
    * [.getIntegrations()](#IntegrationMapper+getIntegrations) ⇒
    * [.handleWebhook(payload)](#IntegrationMapper+handleWebhook) ⇒

<a name="new_IntegrationMapper_new"></a>

### new IntegrationMapper(config)
Constructor.


| Param | Description |
| --- | --- |
| config | The configuration. |

<a name="IntegrationMapper+getData"></a>

### integrationMapper.getData(integrationKey, pagination, requestQueryParams) ⇒
Get the asset data with optional filters.

**Kind**: instance method of [<code>IntegrationMapper</code>](#IntegrationMapper)  
**Returns**: A promise that resolves to the asset data and any supported
query parameters.  
**Throws**:

- <code>Error</code> If the integration does not exist.


| Param | Description |
| --- | --- |
| integrationKey | The integration key. |
| pagination | The pagination options. |
| requestQueryParams | Optional query parameters from the request. |

<a name="IntegrationMapper+submitData"></a>

### integrationMapper.submitData(integrationKey, data) ⇒
Submit data to the asset provider.

**Kind**: instance method of [<code>IntegrationMapper</code>](#IntegrationMapper)  
**Returns**: A promise that resolves to the data response.  
**Throws**:

- <code>Error</code> If the integration does not exist.


| Param | Description |
| --- | --- |
| integrationKey | The integration key. |
| data | The data to submit. |

<a name="IntegrationMapper+getIntegrations"></a>

### integrationMapper.getIntegrations() ⇒
Get the list of integrations.

**Kind**: instance method of [<code>IntegrationMapper</code>](#IntegrationMapper)  
**Returns**: The list of integrations.  
<a name="IntegrationMapper+handleWebhook"></a>

### integrationMapper.handleWebhook(payload) ⇒
Handle a webhook.

**Kind**: instance method of [<code>IntegrationMapper</code>](#IntegrationMapper)  
**Returns**: A promise that resolves to the data response.  
**Throws**:

- <code>Error</code> If the integration does not exist or cannot handle the
webhook payload.


| Param | Description |
| --- | --- |
| payload | The webhook payload. |

<a name="PriceDenominationType"></a>

## PriceDenominationType
Represents the type of price denomination.

**Kind**: global variable  
<a name="FieldInputType"></a>

## FieldInputType
Represents the type of field input.

**Kind**: global variable  
<a name="getIntegration"></a>

## getIntegration(integrationKey) ⇒
Get an integration instance from its key.

**Kind**: global function  
**Returns**: The integration.  
**Throws**:

- <code>Error</code> If the integration does not exist.


| Param | Description |
| --- | --- |
| integrationKey | The integration key. |

<a name="integrationFromWebhookPayload"></a>

## integrationFromWebhookPayload(payload, config) ⇒
Find an integration instance that can handle a webhook payload.

**Kind**: global function  
**Returns**: The integration instance or undefined if not found.  

| Param | Description |
| --- | --- |
| payload | The webhook payload. |
| config | The configuration. |

<a name="handleWebhook"></a>

## handleWebhook(payload, config) ⇒
Handle a webhook.

**Kind**: global function  
**Returns**: A promise that resolves to the data response.  
**Throws**:

- <code>Error</code> If the integration does not exist or cannot handle the
webhook payload.


| Param | Description |
| --- | --- |
| payload | The webhook payload. |
| config | The configuration. |

