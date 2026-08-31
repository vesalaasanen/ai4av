---
spec_id: admin/aja-og-12gda-2x4
schema_version: ai4av-public-spec-v1
revision: 1
title: "AJA OG-12GDA-2x4 Control Spec"
manufacturer: AJA
model_family: OG-12GDA-2x4
aliases: []
compatible_with:
  manufacturers:
    - AJA
  models:
    - OG-12GDA-2x4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documentation.rossvideo.com
  - opengear.tv
source_urls:
  - "https://documentation.rossvideo.com/files/software/dashboard/openGear%20Software%20Development%20Guide%20v9.10.2.pdf"
  - https://www.opengear.tv/card/og-12gda-2x4/
retrieved_at: 2026-08-30T16:38:47.052Z
last_checked_at: 2026-08-30T22:16:18.820Z
generated_at: 2026-08-30T22:16:18.820Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is the generic openGear SDK guide (Ross part 8200DR-006-9.10.2, DashBoard 9.10.2); it contains NO OG-12GDA-2x4-specific parameters, OIDs, menus, or commands. All device-specific settable/readable parameters are unknown."
  - "whether this device is operated via the frame CANbus (through a Frame Network Controller) or via a direct TCP/IP OGP server is not stated in the source."
  - "video/audio routing, gain, equalization, or cable-length parameters for this DA card are not documented in the source."
  - "actual listening port of this device is disclosed during discovery; source does not state it"
  - "OGP connection handshake (OID 0xFF03 / JSON \"handshake\") supports OPTIONAL cleartext password"
  - "device-specific feedbacks (input presence, format, alarms, temperature, etc.) for the"
  - "the concrete settable parameter list for the OG-12GDA-2x4 (e.g. gain, equalization,"
  - "no safety warnings or interlock procedures found in source."
  - "firmware version compatibility, DashBoard version requirements of this specific card, and device-specific OID/menu layout not stated in source."
  - "power consumption, voltage/current specs, and fault behavior of the device are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-30T22:16:18.820Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec action wire tokens appear verbatim in the source; transport ports 5253/5254 are stated; no fabricated or drifting actions. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-30
---

# AJA OG-12GDA-2x4 Control Spec

## Summary
The AJA OG-12GDA-2x4 is an openGear-format 12G/SDI distribution amplifier card, controlled and monitored through the openGear ecosystem using the openGear Protocol (OGP) over TCP/IP (binary OGP or OGP-JSON), as defined in the openGear Software Development Guide for DashBoard v9.10.2. The device is addressed as a sub-device (card) within an openGear frame (via the Frame Network Controller) or directly over TCP/IP, exposing parameters as OID-addressed values with descriptors, constraints, and menus.

<!-- UNRESOLVED: the source is the generic openGear SDK guide (Ross part 8200DR-006-9.10.2, DashBoard 9.10.2); it contains NO OG-12GDA-2x4-specific parameters, OIDs, menus, or commands. All device-specific settable/readable parameters are unknown. -->
<!-- UNRESOLVED: whether this device is operated via the frame CANbus (through a Frame Network Controller) or via a direct TCP/IP OGP server is not stated in the source. -->
<!-- UNRESOLVED: video/audio routing, gain, equalization, or cable-length parameters for this DA card are not documented in the source. -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 5253  # default binary OGP service port (stated in source); OGP-JSON default is 5254
  # UNRESOLVED: actual listening port of this device is disclosed during discovery; source does not state it
  # base_url: UNRESOLVED - device web server (port 80 or 8080) serves http://[host]/connect/connection-props.xml for manual discovery; device-specific URL not stated
auth:
  # UNRESOLVED: OGP connection handshake (OID 0xFF03 / JSON "handshake") supports OPTIONAL cleartext password
  # and trusted/URM authentication; whether this device requires a password is not stated in the source
  type: null
```

## Traits
```yaml
# - queryable  # inferred: OGP query commands returning state present (OGP_GET_PARAM, OGP_GET_NUMPARAMS, etc.)
- queryable
```

## Actions
```yaml
# Binary OGP requests (msgType opcode is the command payload header field; content fields are parameters).
# Responses use msgType = request | 0x80 and are not separate actions.
- id: ogp_start_upload
  label: Start File Upload
  kind: action
  command: "0x40"
  params:
    - name: product
      type: string
      description: Product name (null-terminated, 16 bytes)
    - name: type
      type: integer
      description: File type to be uploaded
    - name: version
      type: integer
      description: 2-byte version code (major:minor)
    - name: compat
      type: integer
      description: Hardware compatibility code (uint32)
    - name: date
      type: integer
      description: File creation time (seconds since Jan 1 1970 UTC)
    - name: length
      type: integer
      description: Total file length in bytes (uint32)
    - name: target
      type: integer
      description: Address for storing the file (uint32)
    - name: crc
      type: integer
      description: CRC16 of file content

- id: ogp_upload_page
  label: Upload File Page
  kind: action
  command: "0x41"
  params:
    - name: type
      type: integer
      description: File type being uploaded
    - name: page
      type: integer
      description: Page number (0-65535), 256-byte page
    - name: content
      type: string
      description: 256-byte page content

- id: ogp_verify_upload
  label: Verify Upload CRC
  kind: action
  command: "0x42"
  params:
    - name: type
      type: integer
      description: File type being uploaded

- id: ogp_reboot
  label: Reboot Device
  kind: action
  command: "0x43"
  params: []

- id: ogp_command
  label: Send Text Command
  kind: action
  command: "0x44"
  params:
    - name: command
      type: string
      description: Command as null-terminated UTF-8 string; interpretation is device-specific

- id: ogp_get_numparams
  label: Query Number of Parameters
  kind: query
  command: "0x45"
  params:
    - name: string_support_flag
      type: integer
      description: 1 indicates support for String-based OIDs

- id: ogp_get_param_oids
  label: Query Parameter OID Table
  kind: query
  command: "0x46"
  params:
    - name: first
      type: integer
      description: Index of first OID to return
    - name: count
      type: integer
      description: Number of OIDs requested (max 128; 0 = all/128)

- id: ogp_get_descriptor
  label: Query Parameter Descriptor
  kind: query
  command: "0x47"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16) of the parameter

- id: ogp_get_param_name
  label: Query Parameter Name
  kind: query
  command: "0x48"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16) of the parameter

- id: ogp_get_param
  label: Query Parameter Value
  kind: query
  command: "0x49"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16) of the parameter

- id: ogp_set_param
  label: Set Parameter Value
  kind: action
  command: "0x4A"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16); OID 0xFF03 is the connection handshake (CONNECT_VERIFY)
    - name: value
      type: string
      description: Binary-encoded data value to set

- id: ogp_set_relative
  label: Set Parameter Value (Relative)
  kind: action
  command: "0x4B"  # obsolete per Appendix A
  params:
    - name: oid
      type: integer
      description: Object ID (uint16)
    - name: value
      type: string
      description: Relative value to apply

- id: ogp_get_array_element
  label: Query Array Element
  kind: query
  command: "0x4C"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16)
    - name: index
      type: integer
      description: Array index (uint16)

- id: ogp_set_array_element
  label: Set Array Element
  kind: action
  command: "0x4D"
  params:
    - name: oid
      type: integer
      description: Object ID (uint16)
    - name: index
      type: integer
      description: Array index (uint16)
    - name: value
      type: string
      description: Binary-encoded value to set

- id: ogp_start_init_blast
  label: Start Initialization Blast
  kind: action
  command: "0x4E"
  params:
    - name: state
      type: integer
      description: OGP_START (0x00)

- id: ogp_get_menuset_name
  label: Query Menu Group Name
  kind: query
  command: "0x50"
  params:
    - name: group
      type: integer
      description: Menu group number

- id: ogp_get_menu_count
  label: Query Menu Count
  kind: query
  command: "0x51"
  params:
    - name: group
      type: integer
      description: Menu group number

- id: ogp_get_menu_name
  label: Query Menu Name
  kind: query
  command: "0x52"
  params:
    - name: group
      type: integer
      description: Menu group number
    - name: menu
      type: integer
      description: Menu number

- id: ogp_get_menu_oids
  label: Query Menu OIDs
  kind: query
  command: "0x53"
  params:
    - name: menu
      type: integer
      description: Menu number

- id: ogp_get_menu_state
  label: Query Menu Display State
  kind: query
  command: "0x5A"
  params:
    - name: menu
      type: integer
      description: Menu number

- id: ogp_get_product_info
  label: Query Product Info (internal use only)
  kind: query
  command: "0x54"
  params: []

- id: ogp_get_product_key
  label: Query Product Key (internal use only)
  kind: query
  command: "0x55"
  params: []

- id: ogp_get_snmp_base
  label: Query SNMP MIB Base OID
  kind: query
  command: "0x56"
  params: []

- id: ogp_get_snmp_oid
  label: Query SNMP OID for Parameter
  kind: query
  command: "0x57"
  params:
    - name: oid
      type: integer
      description: openGear object ID of the parameter

- id: ogp_get_snmp_trap
  label: Query SNMP Trap OID for Parameter
  kind: query
  command: "0x58"
  params:
    - name: oid
      type: integer
      description: openGear object ID of the parameter

- id: ogp_get_external_object
  label: Query External Object Fragment
  kind: query
  command: "0x59"
  params:
    - name: fragment
      type: integer
      description: Fragment number being requested (start at 0)

- id: ogp_get_snmp_type_hint
  label: Query SNMP Type Hint
  kind: query
  command: "0x5B"
  params:
    - name: oid
      type: integer
      description: openGear object ID of the parameter

- id: ogp_get_string_oids
  label: Query String OID Table
  kind: query
  command: "0x66"
  params:
    - name: first
      type: integer
      description: Index of first OID to return (int32)
    - name: count
      type: integer
      description: Number of OIDs requested (uint16; 0 = all/128)

- id: ogp_get_string_descriptor
  label: Query String OID Descriptor
  kind: query
  command: "0x67"
  params:
    - name: oid
      type: string
      description: String object ID (null-terminated)

- id: ogp_get_string
  label: Query String OID Value
  kind: query
  command: "0x69"
  params:
    - name: oid
      type: string
      description: String object ID

- id: ogp_set_string
  label: Set String OID Value
  kind: action
  command: "0x6A"
  params:
    - name: oid
      type: string
      description: String object ID
    - name: value
      type: string
      description: Value to set

- id: ogp_get_string_array_element
  label: Query String Array Element
  kind: query
  command: "0x6C"
  params:
    - name: oid
      type: string
      description: String object ID
    - name: index
      type: integer
      description: Array index (uint16)

- id: ogp_set_string_array_element
  label: Set String Array Element
  kind: action
  command: "0x6D"
  params:
    - name: oid
      type: string
      description: String object ID
    - name: index
      type: integer
      description: Array index (uint16)
    - name: value
      type: string
      description: Value to set

- id: ogp_get_menu_string_oids
  label: Query Menu String OIDs
  kind: query
  command: "0x73"
  params:
    - name: menu
      type: integer
      description: Menu number
    - name: first
      type: integer
      description: Index of first OID to return (uint16)
    - name: count
      type: integer
      description: Number of OIDs requested (uint16; 0 = as many as fit)

# OGP-JSON protocol messages (netstring-framed JSON over TCP, default port 5254)
- id: json_handshake
  label: JSON Connection Handshake
  kind: action
  command: '{"type": "handshake", "slot": {slot}, "payload": {"trusted": {trusted}, "password": "{password}", "force": {force}, "build": "{build}", "detail": "{detail}"}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: trusted
      type: boolean
      description: Whether DashBoard has a URM server connection
    - name: password
      type: string
      description: Device password (cleartext), if required
    - name: force
      type: boolean
      description: Force connection even at max connection count
    - name: detail
      type: string
      description: minimal | full | subscription

- id: json_device_request
  label: JSON Device Definition Request
  kind: query
  command: '{"type": "device-request", "slot": {slot}, "payload": {"detail": "{detail}"}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: detail
      type: string
      description: minimal | full | subscription (subscription adds "subscription": [oids])

- id: json_param_request
  label: JSON Parameter Descriptor Request
  kind: query
  command: '{"type": "param-request", "slot": {slot}, "payload": {"oid": "{oid}"}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: oid
      type: string
      description: Parameter OID

- id: json_value_request
  label: JSON Parameter Value Request
  kind: query
  command: '{"type": "value-request", "slot": {slot}, "payload": {"oid": "{oid}", "element": {element}, "index": {index}}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: oid
      type: string
      description: Parameter OID
    - name: element
      type: boolean
      description: True if addressing an array element
    - name: index
      type: integer
      description: Array index

- id: json_value_set
  label: JSON Set Parameter Value
  kind: action
  command: '{"type": "value", "slot": {slot}, "payload": {"oid": "{oid}", "value": {value}}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: oid
      type: string
      description: Parameter OID
    - name: value
      type: string
      description: Parameter value (Number/String/Array/Object per type)

- id: json_multi_value_set
  label: JSON Set Multiple Parameter Values
  kind: action
  command: '{"type": "multi-value", "slot": {slot}, "payload": [{"oid": "{oid}", "element": {element}, "index": {index}, "value": {value}}]}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: oid
      type: string
      description: Parameter OID (repeated per entry)
    - name: value
      type: string
      description: Parameter value

- id: json_eo_request
  label: JSON External Object Request
  kind: query
  command: '{"type": "eo-request", "slot": {slot}, "payload": {"oid": "{oid}"}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: oid
      type: string
      description: External object ID

- id: json_basic_param_info_request
  label: JSON Basic Param Info Request
  kind: query
  command: '{"type": "basic-param-info-request", "slot": {slot}, "exe-id": "{exe_id}", "payload": {"oid": "{oid}", "recursive": {recursive}}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: exe_id
      type: string
      description: Unique execution ID
    - name: oid
      type: string
      description: Parent OID ("*" for top-level)
    - name: recursive
      type: boolean
      description: Include entire sub-tree or just immediate children

- id: json_update_subscriptions
  label: JSON Update Subscriptions
  kind: action
  command: '{"type": "update-subscriptions", "slot": {slot}, "exe-id": "{exe_id}", "payload": {"subscribe": ["{oid1}"], "unsubscribe": ["{oid2}"]}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
    - name: exe_id
      type: string
      description: Unique execution ID
    - name: subscribe
      type: string
      description: List of parameter OIDs to subscribe (supports "*" wildcard suffix)
    - name: unsubscribe
      type: string
      description: List of parameter OIDs to unsubscribe

- id: json_restart_request
  label: JSON Restart Request
  kind: action
  command: '{"type": "restart-request", "slot": {slot}}'
  params:
    - name: slot
      type: integer
      description: Destination slot ID
```

## Feedbacks
```yaml
- id: product_name
  type: string
  oid: "0x0105"
  description: PRODUCT_NAME - required parameter, identifies the card in DashBoard

- id: supplier_name
  type: string
  oid: "0x0102"
  description: SUPPLIER_NAME - card manufacturer/OEM supplier name

- id: software_rev
  type: string
  oid: "0x010B"
  description: SOFTWARE_REV - card software revision

- id: serial_number
  type: string
  oid: "0x0106"
  description: SERIAL_NUMBER - unique serial number

- id: numparams
  type: integer
  description: OGP_GET_NUMPARAMS response - number of parameters on the device (plus xmlDescriptionURL and numStringOIDs)

- id: param_value
  type: string
  description: OGP_GET_PARAM / OGP_GET_STRING response - binary-encoded value of the requested OID

- id: array_element_value
  type: string
  description: OGP_GET_ARRAY_ELEMENT response - value of one array element

- id: handshake_response
  type: enum
  values: [allowed, refused]
  description: Connection handshake (OID 0xFF03 / JSON handshake) - allow flag plus optional reason (no-connection-available, trusted-connection-required, password-incorrect, bad-password, urm-required, refused)

# UNRESOLVED: device-specific feedbacks (input presence, format, alarms, temperature, etc.) for the
# OG-12GDA-2x4 are not documented in the source; only the generic OGP parameter model is defined.
```

## Variables
```yaml
- id: parameter_by_oid
  oid: "{oid}"
  access: read/write per descriptor
  description: Any parameter the device exposes via OGP_SET_PARAM / OGP_SET_STRING; type, constraint, and access are published per-OID via OGP_GET_DESCRIPTOR

# UNRESOLVED: the concrete settable parameter list for the OG-12GDA-2x4 (e.g. gain, equalization,
# cable length, per-output enable) is not stated in the source - no device OID table is provided.
```

## Events
```yaml
- id: ogp_report_param
  msg_type: "0x10"
  description: Parameter value changed report (asynchronous, sent to OGP_ADDR_TRAP 0x02)

- id: ogp_report_string
  msg_type: "0x14"
  description: String OID parameter value changed report (TCP/IP only; Appendix A marks it "message for stress-test - do not use")

- id: ogp_trap_restart
  msg_type: "0x11"
  trap_id: "0x01"
  description: Device has just booted (OGP_RESTART)

- id: ogp_trap_param_changed
  msg_type: "0x11"
  trap_id: "0x02"
  description: Parameter descriptor/access changed (OGP_PARAM_CHANGED)

- id: ogp_trap_menu_changed
  msg_type: "0x11"
  trap_id: "0x03"
  description: Menu descriptor changed (OGP_MENU_CHANGED)

- id: ogp_trap_extobj_changed
  msg_type: "0x11"
  trap_id: "0x04"
  description: External object changed (OGP_EXTOBJ_CHANGED)

- id: ogp_trap_reveal_element
  msg_type: "0x11"
  trap_id: "0x05"
  description: Request a UI element become visible (OGP_REVEAL_ELEMENT)

- id: ogp_trap_hide_element
  msg_type: "0x11"
  trap_id: "0x06"
  description: Request a UI element be hidden (OGP_HIDE_ELEMENT)

- id: ogp_trap_reload_ui_element
  msg_type: "0x11"
  trap_id: "0x07"
  description: Request a UI element be rebuilt (OGP_RELOAD_UI_ELEMENT)

- id: ogp_trap_string_changed
  msg_type: "0x11"
  trap_id: "0x08"
  description: String OID descriptor changed (TCP/IP only)

- id: ogp_print
  msg_type: "0x00"
  description: Unsolicited debug/print text message (sent to OGP_ADDR_PRINT 0x01)

- id: ogp_bootload
  msg_type: "0x13"
  description: Device bootloader running / reduced-functionality state during upload (sent every 5-10 s)

- id: json_restart
  description: JSON notification that the device is restarting

- id: json_device
  description: JSON device definition message (full params, menus, constraints)

- id: json_param
  description: JSON parameter descriptor message

- id: json_value
  description: JSON parameter value report (device to client)

- id: json_multi_value
  description: JSON multiple parameter value report

- id: json_basic_param_info
  description: JSON basic-param-info response with child parameter descriptors

- id: json_eo
  description: JSON external object return (base64 or netstring binary)

- id: json_hide
  description: JSON request for DashBoard to hide UI elements

- id: json_reveal
  description: JSON request for DashBoard to reveal UI elements

- id: json_reload
  description: JSON request for DashBoard to rebuild UI elements
```

## Macros
```yaml
- id: device_initialization
  name: DashBoard Initial Parameter Query
  steps:
    - "Send OGP_GET_NUMPARAMS (0x45); receive count"
    - "Send OGP_GET_PARAM_OIDS (0x46) requests (up to 128 OIDs each)"
    - "For each OID: OGP_GET_DESCRIPTOR (0x47), fetch external constraint if any, OGP_GET_PARAM (0x49)"
    - "For each menu group 0 then 1: OGP_GET_MENUSET_NAME (0x50), OGP_GET_MENU_COUNT (0x51), then per menu OGP_GET_MENU_NAME (0x52), OGP_GET_MENU_OIDS (0x53), OGP_GET_MENU_STATE (0x5A)"

- id: ogp_file_upload
  name: OGP File Upload Procedure
  steps:
    - "OGP_START_UPLOAD (0x40); on WAIT retry after interval; on INVALID_PRODUCT/INVALID_UPLOAD stop"
    - "Repeat OGP_UPLOAD_PAGE (0x41) with each 256-byte page while data remains"
    - "OGP_VERIFY_UPLOAD (0x42); on INVALID_CRC stop"
    - "OGP_REBOOT (0x43)"

- id: ogp_init_blast
  name: OGP Initialization Blast
  steps:
    - "Device replies OGP_START_INIT_BLAST Response (0xCE) with OGP_START"
    - "For each OID in order: send OGP_GET_DESCRIPTOR_Response (0xC7) then OGP_GET_PARAM Response (0xC9)"
    - "Optionally pre-send menu responses (0xD0, 0xD1, 0xD2, 0xD3, 0xDA) for each menu in sets 0-2"
    - "Send OGP_START_INIT_BLAST Response (0xCE) with OGP_COMPLETE"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source.
# Note: source warns implementers never to send the OGP_RESTART trap during DataSafe restore
# (endless loop risk) - an implementation constraint, not a device safety interlock.
```

## Notes
- Source is the generic "openGear Software Development Guide For DashBoard v9.10.2" (Ross part 8200DR-006-9.10.2); it documents the openGear ecosystem protocols, not OG-12GDA-2x4-specific behavior.
- Binary OGP over TCP/IP uses a wrapper: sync 0xBAD2ACE5 (uint32), source (uint8), dest (uint8), msgType (uint8), length (uint16, max 8192), content. Multi-byte values big-endian. Strings UTF-8 with length byte inclusive of null terminator. Default port 5253, equipmentType `opengear`.
- OGP-JSON over TCP/IP uses netstring framing (`text-length:text-data,`; mixed form `text-length,binary-length:text-data binary-data,`). Default port 5254, equipmentType `opengear-json`. JSON messaging supported in DashBoard 7.0+; subscriptions in 9.4+; minimal mode in 8.7.1+.
- Discovery: automatic via SLP (SLP servers listen on UDP port 427; service type broadcast-equipment), or manual via `http://[host]/connect/connection-props.xml` on web-server port 80 or 8080.
- Timing: devices must respond to each request within 500 ms; DashBoard retries after 1 s up to 3 attempts; unresponsive devices assumed offline. DashBoard closes TCP connections after 10 s of silence — devices should send a heartbeat message at least every 5 s (normally OGP_REPORT_PARAM of OID 0x0105). Max 5 unsolicited messages per second; no individual parameter reported more than once per second.
- Addressing: 6-bit OGP addresses; DashBoard = 0x00; TCP/IP DashBoard Connect devices and frame controller = 0x10; cards in a frame = 0x10 + slotID (1-20). Status/change messages go to OGP_ADDR_TRAP (0x02); debug to OGP_ADDR_PRINT (0x01).
- File upload preferred via HTTP POST (multipart/form-data, field `uploaded_file`) when OID 0xFF02 (UPLOAD_URL) provides a URL; progress reported as `type: content` text lines (Version/Timeout/Report/Percent/Log/Status/RebootOption).
- CANbus transport (extended CAN 2.0B at 1 Mbit/s, 260-byte max content, CRC16 fragmentation per Appendix E) applies only to cards in an openGear frame via the Frame Network Controller.

<!-- UNRESOLVED: firmware version compatibility, DashBoard version requirements of this specific card, and device-specific OID/menu layout not stated in source. -->
<!-- UNRESOLVED: power consumption, voltage/current specs, and fault behavior of the device are not stated in source. -->

## Provenance

```yaml
source_domains:
  - documentation.rossvideo.com
  - opengear.tv
source_urls:
  - "https://documentation.rossvideo.com/files/software/dashboard/openGear%20Software%20Development%20Guide%20v9.10.2.pdf"
  - https://www.opengear.tv/card/og-12gda-2x4/
retrieved_at: 2026-08-30T16:38:47.052Z
last_checked_at: 2026-08-30T22:16:18.820Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-30T22:16:18.820Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec action wire tokens appear verbatim in the source; transport ports 5253/5254 are stated; no fabricated or drifting actions. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is the generic openGear SDK guide (Ross part 8200DR-006-9.10.2, DashBoard 9.10.2); it contains NO OG-12GDA-2x4-specific parameters, OIDs, menus, or commands. All device-specific settable/readable parameters are unknown."
- "whether this device is operated via the frame CANbus (through a Frame Network Controller) or via a direct TCP/IP OGP server is not stated in the source."
- "video/audio routing, gain, equalization, or cable-length parameters for this DA card are not documented in the source."
- "actual listening port of this device is disclosed during discovery; source does not state it"
- "OGP connection handshake (OID 0xFF03 / JSON \"handshake\") supports OPTIONAL cleartext password"
- "device-specific feedbacks (input presence, format, alarms, temperature, etc.) for the"
- "the concrete settable parameter list for the OG-12GDA-2x4 (e.g. gain, equalization,"
- "no safety warnings or interlock procedures found in source."
- "firmware version compatibility, DashBoard version requirements of this specific card, and device-specific OID/menu layout not stated in source."
- "power consumption, voltage/current specs, and fault behavior of the device are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
