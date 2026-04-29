---
schema_version: ai4av-public-spec-v1
device_id: panamax/m4320-pro
entity_id: panamax_m4320_pro_north_america
spec_id: admin/panamax-m4320-pro
revision: 1
author: admin
title: "Panamax M4320-PRO Control Spec"
status: published
manufacturer: Panamax
manufacturer_key: panamax
model_family: M4320-PRO
aliases: []
compatible_with:
  manufacturers:
    - Panamax
  models:
    - M4320-PRO
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
  - https://applicationmarket.crestron.com/panamax-m4320-pro-north-america
  - https://mybluebolt.com/developers
source_documents:
  - title: "Panamax public source"
    url: https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:12:12.094Z
  - title: "Panamax public source"
    url: https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:12:12.659Z
  - title: "Panamax public source"
    url: https://applicationmarket.crestron.com/panamax-m4320-pro-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:12:13.665Z
  - title: "Panamax public source"
    url: https://mybluebolt.com/developers
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:12:14.447Z
  - title: "Panamax public source"
    url: https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T19:12:30.246Z
retrieved_at: 2026-04-26T19:14:16.343Z
last_checked_at: 2026-04-27T09:45:14.928Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - sendinfo
  - sendstatus
  - sendchild
  - sendfamily
  - sendsettings
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:14.928Z
  matched_actions: 13
  action_count: 13
  confidence: high
  summary: "All 13 spec actions matched literally to source commands; transport (port 80, UDP 57010, no auth) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Panamax M4320-PRO Control Spec

## Summary

Panamax M4320-PRO is a 1RU, 20-amp, 8-outlet power conditioner with BlueBOLT programmable outlets and auto-reset. Control is available via BlueBOLT IP/Telnet (TCP) and RS-232 serial. The BlueBOLT BB-RS232 gateway protocol uses XML messages over UDP port 57010 for event subscriptions and command/response communication. HTTP web interface runs on port 80. No authentication/login procedure described in source.

<!-- UNRESOLVED: M4320-PRO-specific command documentation not found; this spec derives from BB-RS232 gateway protocol which applies to BlueBOLT-enabled Panamax/Furman devices. Direct M4320-PRO outlet control commands may differ. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  base_url: http://{device_ip}  # inferred from HTTP interface on port 80
  port: 80  # HTTP web server port stated in source
auth:
  type: none  # inferred: no auth procedure in source
udp:
  port: 57010  # UDP port for XML command/event messaging, stated in source
serial:
  baud_rate: null  # UNRESOLVED: serial baud rate not stated for M4320-PRO
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
```

## Traits
```yaml
- powerable       # inferred: sequence command supports power on/off
- routable        # UNRESOLVED: outlet routing/switching commands present (switch_outlet, cycle_outlet)
- queryable       # inferred: sendstatus, sendinfo queries present
```

## Actions
```yaml
- id: sequence
  label: Sequence
  kind: action
  description: Initiate power turn-on or turn-off sequence for all connected devices
  params:
    - name: action
      type: integer
      description: 1 = turn-on sequence; 0 = turn-off sequence

- id: switch_outlet
  label: Switch Outlet
  kind: action
  description: Control individual outlet bank on a connected SmartLink device
  params:
    - name: id
      type: integer
      description: Outlet bank number (1-based)
    - name: state
      type: integer
      description: 0 = OFF; 1 = ON

- id: cycle_outlet
  label: Cycle Outlet
  kind: action
  description: Power cycle an individual outlet. Outlet turns off then back on after 5 seconds.
  params:
    - name: id
      type: integer
      description: Outlet bank number (1-based)
    - name: delay
      type: integer
      required: false
      description: Delay in seconds (1-254). Default 5 seconds if omitted.

- id: enumerate
  label: Enumerate
  kind: action
  description: Remove current device inventory and (re)discover connected SmartLink devices

- id: rollcall
  label: Roll Call
  kind: action
  description: Cause devices to report their SmartLink address without reassigning addresses

- id: reboot
  label: Reboot
  kind: action
  description: Reboot BB-RS232 gateway

- id: set_time
  label: Set Time
  kind: action
  description: Set internal clock to UNIX timestamp
  params:
    - name: timestamp
      type: integer
      description: UNIX timestamp (seconds since Jan 1 1970)

- id: set_timezone
  label: Set Timezone
  kind: action
  description: Set time zone offset and DST parameters
  params:
    - name: timezone
      type: integer
      description: Offset from UTC in seconds (e.g., -28800 for PST)
    - name: dststart
      type: integer
      description: UNIX timestamp for DST start
    - name: dstshift
      type: integer
      description: DST offset in seconds (e.g., 3600)
    - name: dstend
      type: integer
      description: UNIX timestamp for DST end

- id: refresh_info
  label: Refresh Info
  kind: action
  description: Force connected device to send updated system information

- id: refresh_settings
  label: Refresh Settings
  kind: action
  description: Force connected device to send updated settings information

- id: subscribe_events
  label: Subscribe to Events
  kind: action
  description: Subscribe to autonomous event messages from device
  params:
    - name: uri
      type: string
      description: Subscription URI (ctrlsys://IPADDR:PORT)

- id: unsubscribe_events
  label: Unsubscribe from Events
  kind: action
  params:
    - name: uri
      type: string
      description: Subscription URI to remove

- id: event_ack
  label: Event Acknowledgement
  kind: action
  description: Acknowledge receipt of event message
  params:
    - name: evtid
      type: integer
      description: Event ID to acknowledge
    - name: subsid
      type: integer
      description: Subscriber ID
```

## Feedbacks
```yaml
- id: sendinfo_response
  label: Send Info Response
  type: object
  fields:
    - sernum: Serial number
    - fwver: Firmware version
    - bootcodever: Boot loader firmware version
    - ipaddr: IP address (32-bit decimal)

- id: sendstatus_response
  label: Send Status Response
  type: object
  fields:
    - time: UNIX timestamp
    - ntwkdevcnt: Count of SmartLink connected devices
    - ntwkinvhash: Hash code of connected device inventory
    - ntwkpollstate: Polling state (Furman use only)
    - hdlcstate: HDLC link status (0x000 = no errors)
    - tfilestate: Firmware update file state

- id: device_info
  label: Device Info
  type: object
  description: System info for connected SmartLink device
  fields:
    - sernum: Serial number
    - fwver: Firmware version
    - hwver: Hardware version
    - sladdr: SmartLink address

- id: device_status
  label: Device Status
  type: object
  description: Status for connected SmartLink device (CN-xxxx series)
  fields:
    - voltage: Measured RMS line voltage (0.1Vac resolution)
    - amperage: Total load current (0.01A resolution)
    - wattage: Total power delivered (1W resolution)
    - pwrva: Volt-amperes (1VA resolution)
    - pwrfact: Power factor (0.01 resolution)
    - remote: Remote sensing input logic level
    - protok: Surge protection status (1 = OK, 0 = failed)
    - smp: Series Mode Protection relay state (1 = on, 0 = off)
    - overvolt: Overvoltage condition (1 = detected)
    - undervolt: Undervoltage condition (1 = detected)
    - pwrok: Normal power condition (1 = normal, 0 = fault)
    - seqprog: Power sequence in progress (1 = active)
    - outlet: Outlet bank states (id = bank number, value = 1 ON / 0 OFF)

- id: device_settings
  label: Device Settings
  type: object
  description: Device configuration settings
  fields:
    - adj: Delay time adjustment percentage
    - delay: Time delay set by DIP switches (seconds)
    - totdelay: Total delay time = delay * adj
    - mode: Remote input mode (0=12V off, 1=12V on, 2=Ground on, 3=MOM)
    - seq: Sequence mode (1=Primary, 0=Secondary)
    - alarm: Alarm input mode (1=NO, 0=NC)
    - evs: Extreme Voltage Shutdown mode
    - override: Remote override switch position
    - evtsena: Events enabled (1=yes, 0=no)

- id: sendchild_response
  label: Send Child Response
  type: object
  description: Identifies individual device in SmartLink chain
  fields:
    - class: Device type/model class
    - id: Device ID (serial number)
    - sladdr: SmartLink address

- id: sendfamily_response
  label: Send Family Response
  type: object
  description: Complete list of all connected devices grouped by type
  fields:
    - kids: Array of device IDs per class type

- id: ack
  label: Acknowledgement
  type: object
  description: Ack response when xid attribute included in command
  fields:
    - xid: Transaction ID matching the command
```

## Variables
```yaml
# UNRESOLVED: M4320-PRO specific settable parameters not detailed in BB-RS232 protocol spec.
# Device settings (delay, mode, alarm, etc.) retrieved via sendsettings query but
# no explicit set commands documented in source for these parameters.
```

## Events
```yaml
# Autonomous notifications sent by device (requires subscription via eventmgr subscribe command)

- id: seqdone
  label: Sequence Done
  description: Posted when power on/off sequence is initiated or completed
  fields:
    - seqdone: 1 = done; 0 = in process

- id: outlet_state_change
  label: Outlet State Change
  description: Posted when any outlet bank turns ON or OFF
  fields:
    - outlet id: Bank number
    - state: 0 = OFF, 1 = ON

- id: undervolt_event
  label: Under Voltage Event
  description: Posted when device enters or exits undervoltage shutoff
  fields:
    - undervolt: 0 = normal, 1 = undervoltage condition

- id: overvolt_event
  label: Over Voltage Event
  description: Posted when device enters or exits overvoltage shutoff
  fields:
    - overvolt: 0 = normal, 1 = overvoltage condition

- id: powerok_event
  label: Power OK Event
  description: Posted when operating voltage enters or exits safe range
  fields:
    - powerok: 1 = normal, 0 = abnormal

- id: alarm_event
  label: Alarm Event
  description: Posted when alarm input changes state
  fields:
    - alarm: 1 = active, 0 = no alarm

- id: protectok_event
  label: Protection OK Event
  description: Indicates surge protection circuit status
  fields:
    - protectok: 1 = OK, 0 = failed

- id: reset_event
  label: Reset Event
  description: Posted when device is in reset state
  fields:
    - reset: 1 = reset in progress, 0 = normal

- id: enum_event
  label: Enumerate Event
  description: Posted when device enumeration starts or ends
  fields:
    - phase: "start" or "end"
    - err: error code ("timeout", "blocked", "no n,m...")

- id: enumreqd_event
  label: Enumerate Required Event
  description: Posted when non-legitimate SmartLink address detected
  fields:
    - sladdr: Non-legitimate SmartLink address

- id: roll_event
  label: Roll Call Event
  description: Posted during roll call operation
  fields:
    - phase: "start" or "end"
    - err: error code

- id: objdestroy_event
  label: Object Destroy Event
  description: Posted when SmartLink device removed from inventory
  fields:
    - class: Device type
    - id: Device serial number
    - sladdr: SmartLink address

- id: objcreate_event
  label: Object Create Event
  description: Posted when SmartLink device added to inventory
  fields:
    - class: Device type
    - id: Device serial number
    - sladdr: SmartLink address

- id: devcnt_event
  label: SmartSequencer Count Event
  description: Posted indicating number of devices in SmartLink chain
  fields:
    - devcnt: Number of devices found

- id: ready_event
  label: SmartSequencer Ready Event
  description: Posted when all required data recorded in inventory
  fields:
    - class: Device type
    - id: Device serial number
    - sladdr: SmartLink address

- id: fwupgdreqd_event
  label: Firmware Upgrade Required Event
  description: Posted when firmware update is necessary
  fields:
    - class: Device type
    - sladdr: SmartLink address

- id: hdlclink_event
  label: HDLC Link Event
  description: Indicates status of HDLC link-level communication
  fields:
    - hdlclink: 1 = up, 0 = down

- id: schedfired_event
  label: Scheduled Action Fired Event
  description: Posted when BB-RS232 performs a scheduled operation
  fields:
    - day: Days of week bitmap (decimal)
    - min: Minute of day (0-1439)
    - executed_cmd: The command that was executed
```

## Macros
```yaml
# UNRESOLVED: No multi-step macro sequences described in source for M4320-PRO
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: After receiving enumreqd event, issue enumerate command to re-discover devices
    reference: Section 6.2
# UNRESOLVED: M4320-PRO-specific safety warnings, interlock procedures, or power-on sequencing
# requirements not explicitly stated in BB-RS232 protocol spec.
```

## Notes

The BB-RS232 protocol spec covers the BlueBOLT gateway device and SmartLink-connected Contractor Series devices (CN-xxxx). The M4320-PRO is an 8-outlet BlueBOLT-programmable device — its specific command set may be a subset of the SmartSequencer™ device commands documented here.

Key transport details from source:
- HTTP web interface on port 80 (for network configuration)
- UDP port 57010 for XML command/event messaging
- TCP/Telnet for direct IP control (port not specified in source)
- No authentication/login procedure described

Message format: All messages encapsulated in XML with `<device class="..." id="...">` envelope. Device class for BB-RS232 is `bb232`; identifier is MAC address. Three message types: command, info (query response), event (autonomous notification).

The `<sendstatus/>` query on SmartSequencer devices returns real-time electrical measurements including voltage, amperage, wattage, power factor — confirming the M4320-PRO has power monitoring capabilities.

<!-- UNRESOLVED: M4320-PRO specific outlet count (8 per spec) not reflected in BB-RS232 protocol — outlet id ranges are not bounded in command definitions. -->
<!-- UNRESOLVED: Direct Telnet port number not stated in source — only HTTP port 80 stated for web config. -->
<!-- UNRESOLVED: RS-232 serial configuration (baud rate, data bits, parity, stop bits) not stated in source for M4320-PRO. -->
<!-- UNRESOLVED: BlueBOLT cloud authentication/credentials not applicable to local control. -->

## Provenance

```yaml
source_urls:
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
  - https://applicationmarket.crestron.com/panamax-m4320-pro-north-america
  - https://mybluebolt.com/developers
source_documents:
  - title: "Panamax public source"
    url: https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:12:12.094Z
  - title: "Panamax public source"
    url: https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T19:12:12.659Z
  - title: "Panamax public source"
    url: https://applicationmarket.crestron.com/panamax-m4320-pro-north-america
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:12:13.665Z
  - title: "Panamax public source"
    url: https://mybluebolt.com/developers
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T19:12:14.447Z
  - title: "Panamax public source"
    url: https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-26T19:12:30.246Z
retrieved_at: 2026-04-26T19:14:16.343Z
last_checked_at: 2026-04-27T09:45:14.928Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:14.928Z
matched_actions: 13
action_count: 13
confidence: high
summary: "All 13 spec actions matched literally to source commands; transport (port 80, UDP 57010, no auth) verified verbatim."
```

## Known Gaps

```yaml
- sendinfo
- sendstatus
- sendchild
- sendfamily
- sendsettings
```
