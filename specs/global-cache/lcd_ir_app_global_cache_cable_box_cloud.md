---
spec_id: admin/lcd_ir_app-global_cache_cable_box
schema_version: ai4av-public-spec-v1
revision: 1
title: "Global Caché IR Database Cloud API Control Spec"
manufacturer: "Global Caché"
model_family: "IR Database Cloud API (irdb.globalcache.com)"
aliases: []
compatible_with:
  manufacturers:
    - "Global Caché"
  models:
    - "IR Database Cloud API (irdb.globalcache.com)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/API-GlobalIRDB_ver1.pdf
retrieved_at: 2026-04-30T04:34:18.109Z
last_checked_at: 2026-06-03T07:16:16.692Z
generated_at: 2026-06-03T07:16:16.692Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This spec covers a cloud IR code database service, not physical device control. Compatible models field refers to the API service itself, not end hardware. End-user devices (TVs, cable boxes, etc.) are discovered through the brand/type/model hierarchy."
  - "This is a metadata/code retrieval service, not a controllable device."
  - "No safety-critical device operations in source - cloud API only"
  - "Firmware version for Global Caché hardware not stated in source"
  - "Physical device connection details (RS-232, IP) not applicable — this is a cloud metadata service"
  - "Actual IR transmission commands to physical hardware not documented in this API spec"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:16:16.692Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All actions and transport verified (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Global Caché IR Database Cloud API Control Spec

## Summary
Cloud REST API service for retrieving and delivering IR codes to Global Caché IR broadcasting hardware. Provides brand/type/model lookup, codeset retrieval, and IR code delivery via email or direct response. Not a direct device control protocol — operates over HTTP to a cloud service.

<!-- UNRESOLVED: This spec covers a cloud IR code database service, not physical device control. Compatible models field refers to the API service itself, not end hardware. End-user devices (TVs, cable boxes, etc.) are discovered through the brand/type/model hierarchy. -->

## Transport
```yaml
protocols:
  - https
addressing:
  base_url: https://irdb.globalcache.com:8081
auth:
  type: api_key
  # Login returns temporary apikey used as query param ?apikey={key}
  # API keys change on each login - not durable
```

## Traits
```yaml
# UNRESOLVED: This is a metadata/code retrieval service, not a controllable device.
# Physical IR transmission occurs on Global Caché hardware - not controlled via this API.
```

## Actions
```yaml
# Account management
- id: account_login
  label: Login
  kind: action
  params:
    - name: Email
      type: string
      description: Account email address
    - name: Password
      type: string
      description: Account password

- id: account_logout
  label: Logout
  kind: action
  params:
    - name: apikey
      type: string
      description: API key from login response

- id: account_password_change
  label: Change Password
  kind: action
  params:
    - name: apikey
      type: string
    - name: Password
      type: string
      description: Current password
    - name: NewPassword
      type: string

- id: account_recovery_request
  label: Request Password Recovery
  kind: action
  params:
    - name: EmailAddress
      type: string

- id: account_recovery_validate
  label: Validate Recovery Key
  kind: action
  params:
    - name: key
      type: string
      description: Recovery key from email

- id: account_recovery_complete
  label: Complete Password Recovery
  kind: action
  params:
    - name: key
      type: string
    - name: NewPassword
      type: string

# Brand/Type/Model discovery
- id: list_brands
  label: List Brands
  kind: query
  params: []

- id: list_types
  label: List Device Types
  kind: query
  params: []

- id: list_brand_types
  label: List Types for Brand
  kind: query
  params:
    - name: brand
      type: string

- id: list_type_brands
  label: List Brands for Type
  kind: query
  params:
    - name: type
      type: string

- id: list_models
  label: List Models
  kind: query
  params:
    - name: brand
      type: string
    - name: type
      type: string

# Codeset and function retrieval
- id: get_codeset
  label: Get Codeset
  kind: action
  params:
    - name: setid
      type: string
    - name: output
      type: enum
      values: [email, direct]
    - name: format
      type: enum
      values: [gc, compressed, hex]
    - name: apikey
      type: string
    - name: sandbox
      type: boolean
      description: Testing mode (default false)

- id: get_codeset_models
  label: Get Codeset Model Info
  kind: query
  params:
    - name: setid
      type: string

- id: list_codeset_functions
  label: List Codeset Functions
  kind: query
  params:
    - name: setid
      type: string

- id: get_function_code
  label: Get IR Code for Function
  kind: action
  params:
    - name: setid
      type: string
    - name: function
      type: string
    - name: output
      type: enum
      values: [email, direct]
    - name: format
      type: enum
      values: [gc, compressed, hex]
    - name: apikey
      type: string
    - name: sandbox
      type: boolean
```

## Feedbacks
```yaml
# Account response
- id: account_response
  type: object
  fields:
    - Status: success | failure
    - Message: string
    - Account: Account object | null

# Code response
- id: code_response
  type: object
  fields:
    - Status: success | failure
    - Message: string
    - Code: integer (0=success, 2=apikey not found, 3=not logged in, 4=rate limit, 5=unknown output, 6=output not allowed, 7=apikey missing, 8=email failed, 9=unknown format)
```

## Variables
```yaml
# No settable device parameters - this is a metadata lookup service
```

## Events
```yaml
# No unsolicited events - all requests are client-initiated
```

## Macros
```yaml
# Example workflow (documented in source):
# 1. POST /api/account/login with Email + Password
# 2. Extract apikey from response
# 3. Use apikey in subsequent requests as ?apikey={key}
# 4. GET /api/brands to list available brands
# 5. GET /api/brands/{brand}/types to list types for brand
# 6. GET /api/brands/{brand}/types/{type}/models to list models
# 7. GET /api/codesets/{id}/functions to list available IR functions
# 8. GET /api/codesets/{id}/functions/{function}/codes to retrieve IR code
# 9. POST /api/account/logout to invalidate session
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety-critical device operations in source - cloud API only
```

## Notes
This is not a device control protocol. It is a cloud REST API for looking up IR codes for consumer electronics (TVs, DVD players, cable boxes, etc.). The actual IR transmission occurs on Global Caché IR broadcasting hardware that is separate from this API service.

Key characteristics:
- Base URL: `https://irdb.globalcache.com:8081`
- Authentication: Login returns temporary API key, passed as query parameter `?apikey={key}`
- API keys are session-based, not durable — change on each login
- Rate limiting: Limited number of IR code requests per account per day
- Sandbox mode available for testing without consuming daily allowance
- Special URL character escaping required for brand/type/model/function names (`/` → `xfslx`, `&` → `xampx`, etc.)

<!-- UNRESOLVED: Firmware version for Global Caché hardware not stated in source -->
<!-- UNRESOLVED: Physical device connection details (RS-232, IP) not applicable — this is a cloud metadata service -->
<!-- UNRESOLVED: Actual IR transmission commands to physical hardware not documented in this API spec -->

## Provenance

```yaml
source_domains:
  - globalcache.com
source_urls:
  - https://www.globalcache.com/files/docs/API-GlobalIRDB_ver1.pdf
retrieved_at: 2026-04-30T04:34:18.109Z
last_checked_at: 2026-06-03T07:16:16.692Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:16:16.692Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All actions and transport verified (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This spec covers a cloud IR code database service, not physical device control. Compatible models field refers to the API service itself, not end hardware. End-user devices (TVs, cable boxes, etc.) are discovered through the brand/type/model hierarchy."
- "This is a metadata/code retrieval service, not a controllable device."
- "No safety-critical device operations in source - cloud API only"
- "Firmware version for Global Caché hardware not stated in source"
- "Physical device connection details (RS-232, IP) not applicable — this is a cloud metadata service"
- "Actual IR transmission commands to physical hardware not documented in this API spec"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
