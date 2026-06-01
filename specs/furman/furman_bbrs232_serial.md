---
spec_id: admin/furman-bbrs232-bluebolt
schema_version: ai4av-public-spec-v1
revision: 1
title: "Furman BB-RS232 BlueBOLT Control Spec"
manufacturer: Furman
model_family: BB-RS232
aliases: []
compatible_with:
  manufacturers:
    - Furman
  models:
    - BB-RS232
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.shopify.com
  - classic.mybluebolt.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_F1500-UPS_manual.pdf?v=1723587516"
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S-2400S_com-prot.pdf?v=1725473819"
retrieved_at: 2026-05-19T04:33:34.064Z
last_checked_at: 2026-05-20T12:14:52.596Z
generated_at: 2026-05-20T12:14:52.596Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T12:14:52.596Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Furman BB-RS232 BlueBOLT Control Spec

## Summary
Furman BB-RS232 is an IP-to-SmartLink gateway device providing network control and monitoring of connected Furman Contractor Series power management devices (CN-1800 S, CN-2400 S, CN-3600 SE, CN-15MP, CN-20MP). Communication uses XML-formatted messages over UDP port 57010 on the local LAN. A built-in HTTP interface on port 80 provides web-based configuration. No authentication procedure is described for local control.

<!-- UNRESOLVED: RS-232 serial parameters (baud/data bits/parity/stop bits) not stated for SmartLink downstream communication -->

## Transport
```yaml
protocols:
  - udp
  - http
addressing:
  port: 57010  # UDP port for XML command/response/event messaging
  base_url: http://{device_ip}:80  # HTTP web interface for config only
auth:
  type: none  # inferred: no auth procedure in source for local UDP control
```

## Traits
```yaml
- powerable       # inferred: sequence command supports power on/off
- routable        # inferred: device chain with SmartLink addressing
- queryable       # inferred: sendinfo, sendstatus, sendsettings queries present
```

## Actions
```yaml
- id: set_time
  label: Set Time
  kind: action
  params:
    - name: timestamp
      type: integer
      description: UNIX timestamp (seconds since Jan 1 1970 UTC)

- id: set_zone_info
  label: Set Timezone
  kind: action
  params:
    - name: timezone
      type: integer
      description: Offset from UTC in seconds (negative for west of UTC)
    - name: dst_start
      type: integer
      description: UNIX timestamp for daylight savings start
    - name: dst_shift
      type: integer
      description: Seconds to offset during daylight savings (typically 3600)
    - name: dst_end
      type: integer
      description: UNIX timestamp for daylight savings end

- id: enumerate
  label: Enumerate Devices
  kind: action
  params: []

- id: rollcall
  label: Roll Call
  kind: action
  params: []

- id: reboot
  label: Reboot
  kind: action
  params: []

- id: sequence
  label: Power Sequence
  kind: action
  params:
    - name: action
      type: integer
      description: "1 = turn-on sequence; 0 = turn-off sequence"

- id: sendchild
  label: Query Individual Device
  kind: query
  params:
    - name: ndx
      type: integer
      description: SmartLink index number (0-based)

- id: sendfamily
  label: Query All Devices
  kind: query
  params: []

- id: sendinfo
  label: Query System Info
  kind: query
  params: []

- id: sendstatus
  label: Query Status
  kind: query
  params: []

- id: subscribe_events
  label: Subscribe to Events
  kind: action
  params:
    - name: uri
      type: string
      description: "URI in format ctrlsys://{ip}:{port}"

- id: unsubscribe_events
  label: Unsubscribe from Events
  kind: action
  params:
    - name: uri
      type: string
      description: "URI in format ctrlsys://{ip}:{port}"

- id: event_ack
  label: Acknowledge Event
  kind: action
  params:
    - name: evtid
      type: integer
      description: Event ID to acknowledge
    - name: subsid
      type: integer
      description: Subscriber ID to acknowledge
- id: outlet
  label: Switch Outlet
  kind: action
  params:
    - name: id
      type: integer
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: cycleoutlet
  label: Cycle Outlet
  kind: action
  params:
    - name: id
      type: integer
    - name: delay
      type: integer

- id: refreshinfo
  label: Refresh Info
  kind: action
  params: []

- id: refreshsettings
  label: Refresh Settings
  kind: action
  params: []

- id: sendsettings
  label: Query Device Settings
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: system_info
  type: object
  fields:
    - name: sernum
      type: string
      description: Serial number
    - name: fwver
      type: string
      description: Firmware version
    - name: bootcodever
      type: string
      description: Boot loader firmware version
    - name: ipaddr
      type: string
      description: IP address as 32-bit decimal

- id: system_status
  type: object
  fields:
    - name: ntwkdevcnt
      type: integer
      description: Count of SmartLink connected devices
    - name: ntwkinvhash
      type: string
      description: Hash of connected device inventory
    - name: ntwkpollstate
      type: integer
      description: Polling state of device chain
    - name: hdlcstate
      type: string
      description: HDLC communication status (0x000 = OK)
    - name: tfilestate
      type: string
      description: Firmware update file management state

- id: child_info
  type: object
  fields:
    - name: class
      type: string
      description: Device class (cn1800, cn2400, cn3600, cnmp15, cnmp20)
    - name: id
      type: string
      description: Device serial number

- id: device_info
  type: object
  fields:
    - name: sernum
      type: string
      description: Device serial number
    - name: fwver
      type: string
      description: Firmware version
    - name: hwver
      type: string
      description: Hardware version
    - name: sladdr
      type: integer
      description: SmartLink address (0-based index)

- id: device_status
  type: object
  fields:
    - name: voltage
      type: number
      description: Measured RMS line voltage (0.1Vac resolution)
    - name: amperage
      type: number
      description: Measured total load current (0.01A resolution)
    - name: wattage
      type: number
      description: Measured total power (1W resolution)
    - name: pwrva
      type: number
      description: Measured volt-amperes (1VA resolution)
    - name: pwrfact
      type: number
      description: Measured power factor (0.01 resolution)
    - name: per
      type: object
      description: Packet error rate per link (0.00 to 1.00)
    - name: remote
      type: integer
      description: Remote sensing input logic level
    - name: protok
      type: integer
      description: Surge protection status (1 = OK, 0 = failed)
    - name: smp
      type: integer
      description: Series Mode Protection relay state (1 = on, 0 = off)
    - name: secok
      type: integer
      description: Secondary SmartLink status (1 = communicating, 0 = no response)
    - name: overvolt
      type: integer
      description: Overvoltage condition (1 = detected, 0 = clear)
    - name: undervolt
      type: integer
      description: Undervoltage condition (1 = detected, 0 = clear)
    - name: pwrok
      type: integer
      description: Normal power condition (1 = normal, 0 = fault)
    - name: seqprog
      type: integer
      description: Power sequence in progress (1 = active, 0 = idle)
    - name: outlet
      type: object
      description: Outlet bank states indexed by id (1 = ON, 0 = OFF)

- id: device_settings
  type: object
  fields:
    - name: adj
      type: number
      description: Delay time adjustment percentage
    - name: delay
      type: number
      description: Time delay set by DIP switches (seconds)
    - name: totdelay
      type: number
      description: Total delay time = delay * adj
    - name: mode
      type: integer
      description: Remote input operating mode (0=12V off, 1=12V on, 2=Ground on, 3=MOM)
    - name: seq
      type: integer
      description: Sequence mode (1=Primary, 0=Secondary)
    - name: alarm
      type: integer
      description: Alarm input mode (1=NO, 0=NC)
    - name: evs
      type: integer
      description: Extreme Voltage Shutdown mode
    - name: override
      type: integer
      description: Remote override switch position
    - name: evtsena
      type: integer
      description: Events enabled (1=enabled, 0=disabled)

- id: ack
  type: object
  fields:
    - name: xid
      type: integer
      description: Transaction ID from requesting command
```

## Events
```yaml
# BB-RS232 events:
- id: enumerate_event
  params:
    - name: phase
      type: string
      values: [start, end]
    - name: err
      type: string
      description: Error code or "no n,m..." list of missing devices

- id: enumerate_required
  params:
    - name: sladdr
      type: integer
      description: Non-legitimate SmartLink address requiring enumeration

- id: rollcall_event
  params:
    - name: phase
      type: string
      values: [start, end]
    - name: err
      type: string
      description: Error code or "dup n,m..." list of duplicate addresses

- id: object_destroy
  params:
    - name: class
      type: string
      description: Device class removed
    - name: id
      type: string
      description: Serial number of removed device
    - name: sladdr
      type: integer
      description: SmartLink address of removed device

- id: object_create
  params:
    - name: class
      type: string
      description: Device class added
    - name: id
      type: string
      description: Serial number of added device
    - name: sladdr
      type: integer
      description: SmartLink address of added device

- id: device_count
  params:
    - name: devcnt
      type: integer
      description: Number of devices on SmartLink chain

- id: device_ready
  params:
    - name: class
      type: string
      description: Device type ready
    - name: id
      type: string
      description: Serial number
    - name: sladdr
      type: integer
      description: SmartLink address

- id: firmware_upgrade_required
  params:
    - name: class
      type: string
      description: Device type needing upgrade
    - name: sladdr
      type: integer
      description: SmartLink address

- id: hdlc_link
  params:
    - name: status
      type: integer
      description: "1 = link up, 0 = link down"

- id: scheduled_action
  params:
    - name: day
      type: integer
      description: Day-of-week bitmap (decimal) for scheduled days
    - name: min
      type: integer
      description: Minute of day (0-1439) for scheduled firing
    - name: executed_cmd
      type: string
      description: Command that was executed

# SmartSequencer device events:
- id: sequence_done
  params:
    - name: state
      type: integer
      description: "1 = done, 0 = in process"

- id: outlet_state_change
  params:
    - name: id
      type: integer
      description: Outlet bank number
    - name: state
      type: integer
      description: "1 = ON, 0 = OFF"

- id: undervoltage
  params:
    - name: state
      type: integer
      description: "0 = clear, 1 = undervoltage condition"

- id: overvoltage
  params:
    - name: state
      type: integer
      description: "0 = clear, 1 = overvoltage condition"

- id: power_ok
  params:
    - name: state
      type: integer
      description: "1 = normal, 0 = abnormal"

- id: alarm_event
  params:
    - name: state
      type: integer
      description: "1 = active, 0 = clear"

- id: protection_ok
  params:
    - name: state
      type: integer
      description: "1 = OK, 0 = failed"

- id: reset_event
  params:
    - name: state
      type: integer
      description: "1 = reset in progress, 0 = normal"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented - all config via actions/queries
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
BB-RS232 is an IP-to-SmartLink gateway. Downstream Furman Contractor Series devices (CN-1800 S, CN-2400 S, CN-3600 SE, CN-15MP, CN-20MP) are controlled via SmartLink protocol over the BB-RS232 chain. Message envelope is XML with device class tag and MAC/serial identifier. Events are sent to a subscribed IP:port via UDP; acknowledgement required within ~20 min or event repeats. Scheduled actions use a day-of-week bitmap (7-bit decimal) where bit 0 = Thursday.

<!-- UNRESOLVED: RS-232 serial config (baud/parity/data bits/stop bits) for SmartLink chain not stated in source -->
<!-- UNRESOLVED: authentication token format for BlueBOLT cloud not applicable to local UDP control -->
<!-- UNRESOLVED: binary command encoding (HDLC framing) not fully documented — only XML text layer shown -->

## Provenance

```yaml
source_domains:
  - cdn.shopify.com
  - classic.mybluebolt.com
source_urls:
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_F1500-UPS_manual.pdf?v=1723587516"
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - "https://cdn.shopify.com/s/files/1/0884/1006/3168/files/pdf_CN-1800S-2400S_com-prot.pdf?v=1725473819"
retrieved_at: 2026-05-19T04:33:34.064Z
last_checked_at: 2026-05-20T12:14:52.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T12:14:52.596Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
