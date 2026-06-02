---
spec_id: admin/control4-knx-routing-gateway
schema_version: ai4av-public-spec-v1
revision: 1
title: "Control4 KNX Routing Gateway Control Spec"
manufacturer: Control4
model_family: knx_routing_gateway.c4z
aliases: []
compatible_with:
  manufacturers:
    - Control4
  models:
    - knx_routing_gateway.c4z
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - control4.github.io
  - snap-one.github.io
  - developer.control4.com
source_urls:
  - https://control4.github.io/docs-driverworks-knx/
  - https://snap-one.github.io/docs-driverworks-knx/
  - https://developer.control4.com
retrieved_at: 2026-05-21T07:26:31.297Z
last_checked_at: 2026-06-02T08:09:54.603Z
generated_at: 2026-06-02T08:09:54.603Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This spec describes the driver (knx_routing_gateway.c4z) not a standalone hardware device — no direct TCP port exposed by the driver itself; port 3671 is the KNX multicast port used by the KNX system"
  - "driver exposes per-channel variables (CHANNEL_1_STEP, etc.)"
  - "no multi-step sequences described in source"
  - "no safety-critical hardware voltage/current/power specs - driver operates at software level only"
  - "hardware device firmware version compatibility — source describes driver/API only"
  - "individual device command encodings (raw KNX frames) — not exposed at driver level"
  - "actual IP address of the KNX Routing Gateway hardware — assigned during installation, not stated in doc"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:09:54.603Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions match source API commands or DPT sections verbatim; transport port 3671 and multicast 224.0.23.12 confirmed; feedbacks cover remaining callbacks; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Control4 KNX Routing Gateway Control Spec

## Summary

Control4 KNX Routing Gateway is a Composer Pro driver that acts as a network-layer bridge between Control4 home automation controllers and KNX-certified devices. It uses KNXnet/IP Routing (connection-less IP multicast) over Ethernet to communicate with KNX devices on the network. No login or authentication procedure is required.

<!-- UNRESOLVED: This spec describes the driver (knx_routing_gateway.c4z) not a standalone hardware device — no direct TCP port exposed by the driver itself; port 3671 is the KNX multicast port used by the KNX system -->

## Transport
```yaml
protocols:
  - udp  # KNXnet/IP Routing is connection-less IP multicast (UDP); source line 38 "connection-less multicast protocol", line 65 "IP multicast protocol"
addressing:
  port: 3671  # KNX multicast port - official KNX Association default (source line 91)
  multicast_address: 224.0.23.12  # official KNX Association IP multicast address (source line 89)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred: switch/dimmer drivers support ON/OFF via DPT_1
- routable       # inferred: KNX Group Address routing
- queryable      # inferred: REQUEST_STATUS, KNX_READ_REQUEST commands present
- levelable      # inferred: dimmer drivers support brightness control via DPT_3, DPT_5_001
```

## Actions
```yaml
- id: ADD_GROUP_ITEM
  label: Add Group Item
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DEVICE_ID
      type: integer
      description: Device ID of the driver
    - name: PROPERTY
      type: string
      description: Property Name in Composer where the Group Address is stored
    - name: DATA_POINT_TYPE
      type: string
      description: KNX Data Point Type (e.g. DPT_1, DPT_3)
    - name: STARTUP_READ
      type: boolean
      required: false
      description: If false, Group Address will not be read on startup

- id: CLEAR_GROUP_ITEM
  label: Clear Group Item
  kind: action
  params:
    - name: DEVICE_ID
      type: integer
      description: Device ID of the driver

- id: GET_NETWORK_VERSION
  label: Get Network Version
  kind: action
  params:
    - name: DEVICE_ID
      type: integer
      description: Device ID of the driver

- id: REQUEST_STATUS
  label: Request Status
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function

- id: SEND_TO_KNX
  label: Send to KNX
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: KNX Data Point Type
    # Additional parameters depend on DPT used

- id: UPDATE_GROUP_ITEM
  label: Update Group Item
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DEVICE_ID
      type: integer
      description: Device ID of the driver
    - name: PROPERTY
      type: string
      description: Property Name in Composer where the Group Address is stored
    - name: DATA_POINT_TYPE
      type: string
      description: KNX Data Point Type

- id: REMOVE_GROUP_ITEM
  label: Remove Group Item
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DEVICE_ID
      type: integer
      description: Device ID of the driver
    - name: PROPERTY
      type: string
      description: Property Name in Composer where the Group Address is stored

- id: DISPLAY_GLOBALS
  label: Display Globals
  kind: action
  params: []

- id: DISPLAY_GROUP_ADDRESSES
  label: Display Group Addresses
  kind: action
  params: []

- id: CONNECT
  label: Connect to KNX Network
  kind: action
  params: []

- id: DISCONNECT
  label: Disconnect from KNX Network
  kind: action
  params: []

- id: send_dpt_1
  label: Send DPT_1 (Boolean)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_1"
    - name: VALUE
      type: integer
      description: Boolean value - 0 or 1

- id: send_dpt_2
  label: Send DPT_2 (Boolean with control)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_2"
    - name: CONTROL
      type: integer
      description: 0 for No Control, 1 for Control
    - name: VALUE
      type: integer
      description: Boolean value - 0 or 1

- id: send_dpt_3
  label: Send DPT_3 (Dimming / Step)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_3"
    - name: DIRECTION
      type: integer
      description: 0 = Decrease (lighting) / Up (blind); 1 = Increase (lighting) / Down (blind)
    - name: STEP_CODE
      type: integer
      description: Number of intervals into which 0%..100% range is subdivided, or break indication

- id: send_dpt_4
  label: Send DPT_4 (Character)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_4"
    - name: VALUE
      type: integer
      description: 0 through 255. 8-bit value representing a character

- id: send_dpt_5
  label: Send DPT_5 (8-bit unsigned)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_5"
    - name: VALUE
      type: integer
      description: 0 through 255. 8-bit unsigned value

- id: send_dpt_6
  label: Send DPT_6 (8-bit signed)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_6"
    - name: VALUE
      type: integer
      description: -128 through 127. 8-bit relative value

- id: send_dpt_7
  label: Send DPT_7 (2-octet unsigned)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_7"
    - name: VALUE
      type: integer
      description: 0 - 65535. 2-octet unsigned value

- id: send_dpt_8
  label: Send DPT_8 (2-octet signed)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_8"
    - name: VALUE
      type: integer
      description: -32768 through 32767. 2-octet signed value

- id: send_dpt_9
  label: Send DPT_9 (2-octet float)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_9"
    - name: VALUE
      type: number
      description: -671088.64 - 670760.96. 2-octet float value (e.g. temperature)

- id: send_dpt_10
  label: Send DPT_10 (Time with day-of-week)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_10"
    - name: DAY
      type: integer
      description: 0-7. 0=No day, 1=Monday
    - name: HOUR
      type: integer
      description: 0-23
    - name: MINUTE
      type: integer
      description: 0-59
    - name: SECOND
      type: integer
      description: 0-59

- id: send_dpt_11
  label: Send DPT_11 (Date)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_11"
    - name: DAY
      type: integer
      description: 1 through 31
    - name: MONTH
      type: integer
      description: 1 through 12
    - name: YEAR
      type: integer
      description: 0 through 99

- id: send_dpt_12
  label: Send DPT_12 (4-octet unsigned)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_12"
    - name: VALUE
      type: integer
      description: 0 - 4294967295. 4-octet unsigned value

- id: send_dpt_13
  label: Send DPT_13 (4-octet signed)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_13"
    - name: VALUE
      type: integer
      description: -2147483648 to 2147483647. 4-octet signed value

- id: send_dpt_14
  label: Send DPT_14 (4-octet float)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_14"
    - name: VALUE
      type: number
      description: -2.14748E009 to +2.14748E009. 4-octet float value

- id: send_dpt_16
  label: Send DPT_16 (Text)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_16"
    - name: VALUE
      type: string
      description: 14-character text string

- id: send_dpt_17
  label: Send DPT_17 (Scene number)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_17"
    - name: VALUE
      type: integer
      description: Scene number 0-63

- id: send_dpt_18
  label: Send DPT_18 (Scene control)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_18"
    - name: VALUE
      type: integer
      description: Scene number 0-63
    - name: CONTROL
      type: integer
      description: 0 = activate scene; 1 = learn scene

- id: send_dpt_19
  label: Send DPT_19 (Date and Time)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_19"
    - name: YEAR
      type: integer
      required: false
      description: 1900-2155, or nil if not used
    - name: MONTH
      type: integer
      required: false
      description: 1-12, or nil if date is not used
    - name: DAY
      type: integer
      required: false
      description: 1-31, or nil if date is not used
    - name: WEEKDAY
      type: integer
      required: false
      description: 0-7, or nil if day-of-week is not used
    - name: HOUR
      type: integer
      required: false
      description: 0-24, or nil if time is not used
    - name: MINUTE
      type: integer
      required: false
      description: 0-60, or nil if time is not used
    - name: SECOND
      type: integer
      required: false
      description: 0-60, or nil if time is not used
    - name: WORKING_DAY
      type: integer
      required: false
      description: 0 or 1, nil if not used
    - name: SUMMER_TIME
      type: integer
      required: false
      description: 0 or 1 (Standard Summer Time), nil if not used
    - name: CLOCK_QUALITY
      type: integer
      required: false
      description: 0 = clock without external sync; 1 = clock with external sync; nil if not used
    - name: FAULT
      type: integer
      required: false
      description: 1 if one or more supported fields are corrupted, 0 otherwise

- id: send_dpt_5_001
  label: Send DPT_5_001 (Percentage)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_5_001"
    - name: VALUE
      type: integer
      description: Percentage 0% - 100%

- id: send_dpt_232
  label: Send DPT_232 (RGB color)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_232"
    - name: R
      type: integer
      description: Red value 0-255
    - name: G
      type: integer
      description: Green value 0-255
    - name: B
      type: integer
      description: Blue value 0-255

- id: send_dpt_242_600
  label: Send DPT_242_600 (xyY color)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_242_600"
    - name: X
      type: integer
      required: false
      description: x-coordinate (0 to 6553), or nil if only brightness is passed
    - name: Y
      type: integer
      required: false
      description: y-coordinate (0 to 6553), or nil if only brightness is passed
    - name: BRIGHTNESS
      type: integer
      required: false
      description: Brightness 0%-100%, or nil if only x/y are passed

- id: send_dpt_251_600
  label: Send DPT_251_600 (RGBW color)
  kind: action
  params:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for the Object Function
    - name: DATA_POINT_TYPE
      type: string
      description: Must be "DPT_251_600"
    - name: R
      type: integer
      required: false
      description: Red color level 0%-100%, or nil if not used
    - name: G
      type: integer
      required: false
      description: Green color level 0%-100%, or nil if not used
    - name: B
      type: integer
      required: false
      description: Blue color level 0%-100%, or nil if not used
    - name: W
      type: integer
      required: false
      description: White color level 0%-100%, or nil if not used
```

## Feedbacks
```yaml
- id: DATA_FROM_KNX
  type: object
  properties:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address associated with the received data
    - name: RESPONSE
      type: boolean
      description: Specifies if received data is a response to a read request
    # All other parameters depend on the DPT configured for the Group Address

- id: NETWORK_VERSION
  type: object
  properties:
    - name: VERSION
      type: number
      description: KNX Network driver version number

- id: KNX_READ_REQUEST
  type: object
  properties:
    - name: GROUP_ADDRESS
      type: string
      description: KNX Group Address for which a read request is issued

- id: CONNECTION_STATUS
  type: enum
  values:
    - "Connection with KNXnet/IP Server successful"
    - "The KNXnet/IP Server device cannot find an active data connection with the specified ID"
    - "The requested connection type is not supported by the KNXnet/IP Server device"
    - "One or more requested connection options are not supported by the KNXnet/IP Server device"
    - "The KNXnet/IP Server device cannot accept the new data connection because its maximum amount of concurrent connections is already occupied"
    - "The KNXnet/IP Server device detects an error concerning the data connection with the specified ID"
    - "The KNXnet/IP Server device detects an error concerning the KNX subnetwork connection with the specified ID"
    - "Unknown status from KNXnet/IP Server device"
```

## Variables
```yaml
# UNRESOLVED: driver exposes per-channel variables (CHANNEL_1_STEP, etc.)
# Variable availability depends on Data Point Type configured
# Source does not enumerate all possible variables - operator should inspect
# the driver source for the specific version in use
```

## Events
```yaml
# The KNX Generic driver exposes programming events; the Routing Gateway
# driver itself does not expose standalone events - events are delivered via
# DATA_FROM_KNX feedbacks to driver consumers
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "KNX Minimum Delay (ms) - driver waits this time after receiving data from KNX before sending; range 25-500 ms; prevents command flooding"
  - description: "KNX Maximum Delay (ms) - maximum interval between sent commands; range 50-500 ms; for 10 devices at 100 ms interval, all OFF commands are sent 900 ms apart"
  - description: "Set Read flag (R) on all status Group Objects in ETS - driver issues read requests at startup for all status addresses; read requests only work if Read flag is set in ETS"
# UNRESOLVED: no safety-critical hardware voltage/current/power specs - driver operates at software level only
```

## Notes

The KNX Routing Gateway driver uses KNXnet/IP Routing (IP multicast over UDP) not KNXnet/IP Tunneling. Control4 recommends Routing over Tunneling due to strict timing requirements of Tunneling that cause occasional disconnections. All KNXnet/IP routing devices on the local network must be configured for multicast routing. Port 3671 and multicast address 224.0.23.12 are the official KNX Association defaults and should only be changed if the network infrastructure requires it.

Group Address format in ETS uses three-level (e.g. 0/0/10) notation. Driver properties allow assigning KNX Group Addresses to device functions (switching, dimming, feedback, etc.).

The driver exposes 7 SendToProxy API methods (ADD_GROUP_ITEM, CLEAR_GROUP_ITEM, GET_NETWORK_VERSION, REMOVE_GROUP_ITEM, REQUEST_STATUS, SEND_TO_KNX, UPDATE_GROUP_ITEM) and receives 3 callback commands from the network driver (DATA_FROM_KNX, KNX_READ_REQUEST, NETWORK_VERSION). SEND_TO_KNX accepts 22 Datapoint Types, each with its own parameter schema - each enumerated as a separate send variant action.

Datapoint Types (DPTs) supported: DPT_1 (boolean), DPT_2 (boolean + control), DPT_3 (dimming/step), DPT_4 (character), DPT_5 (8-bit unsigned), DPT_6 (8-bit signed), DPT_7 (2-byte unsigned), DPT_8 (2-byte signed), DPT_9 (2-byte float), DPT_10 (time), DPT_11 (date), DPT_12 (4-byte unsigned), DPT_13 (4-byte signed), DPT_14 (4-byte float), DPT_16 (text), DPT_17 (scene), DPT_18 (scene control), DPT_19 (date+time), DPT_5_001 (percentage), DPT_232 (RGB), DPT_242_600 (xyY color), DPT_251_600 (RGBW). DPT_15 is not supported.

DPT_19, DPT_242_600 and DPT_251_600 are available from KNX Routing Gateway driver version 44 and later.

<!-- UNRESOLVED: hardware device firmware version compatibility — source describes driver/API only -->
<!-- UNRESOLVED: individual device command encodings (raw KNX frames) — not exposed at driver level -->
<!-- UNRESOLVED: actual IP address of the KNX Routing Gateway hardware — assigned during installation, not stated in doc -->

## Provenance

```yaml
source_domains:
  - control4.github.io
  - snap-one.github.io
  - developer.control4.com
source_urls:
  - https://control4.github.io/docs-driverworks-knx/
  - https://snap-one.github.io/docs-driverworks-knx/
  - https://developer.control4.com
retrieved_at: 2026-05-21T07:26:31.297Z
last_checked_at: 2026-06-02T08:09:54.603Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:09:54.603Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions match source API commands or DPT sections verbatim; transport port 3671 and multicast 224.0.23.12 confirmed; feedbacks cover remaining callbacks; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This spec describes the driver (knx_routing_gateway.c4z) not a standalone hardware device — no direct TCP port exposed by the driver itself; port 3671 is the KNX multicast port used by the KNX system"
- "driver exposes per-channel variables (CHANNEL_1_STEP, etc.)"
- "no multi-step sequences described in source"
- "no safety-critical hardware voltage/current/power specs - driver operates at software level only"
- "hardware device firmware version compatibility — source describes driver/API only"
- "individual device command encodings (raw KNX frames) — not exposed at driver level"
- "actual IP address of the KNX Routing Gateway hardware — assigned during installation, not stated in doc"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
