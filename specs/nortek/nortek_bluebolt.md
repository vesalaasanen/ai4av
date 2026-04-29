---
schema_version: ai4av-public-spec-v1
device_id: nortek/bluebolt-bb-rs232
entity_id: nortek_bluebolt
spec_id: admin/nortek-bluebolt-bb-rs232
revision: 1
author: admin
title: "Nortek BlueBOLT BB-RS232 Control Spec"
status: published
manufacturer: Nortek
manufacturer_key: nortek
model_family: "BlueBOLT BB-RS232"
aliases: []
compatible_with:
  manufacturers:
    - Nortek
  models:
    - "BlueBOLT BB-RS232"
    - "CN-1800 S"
    - "CN-2400 S"
    - "CN-3600 SE"
    - CN-15MP
    - CN-20MP
  firmware: "\"\" # UNRESOLVED: firmware version not stated in the source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nortek_bluebolt_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:41:02.881Z
retrieved_at: 2026-04-25T21:41:02.881Z
last_checked_at: 2026-04-25T21:41:02.881Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in the source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:41:02.881Z
  matched_actions: 36
  action_count: 36
  confidence: low
  summary: "All 36 spec actions matched source commands; transport verified; complete protocol coverage"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Nortek BlueBOLT BB-RS232 Control Spec

## Summary
The Nortek BlueBOLT BB-RS232 is an RS-232 to Ethernet gateway device that manages a chain of SmartSequencer™-compatible power conditioning devices (CN-xxxx and MP-xxxx series). Control and event messaging use XML documents exchanged over UDP port 57010. A built-in HTTP interface on port 80 allows network configuration. No authentication is required for local UDP control.

<!-- UNRESOLVED: serial (RS-232) transport parameters not documented for BB-RS232 itself — the device acts as a gateway; the RS-232 side connects to a host PC or automation controller -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 57010  # UDP port for XML command/event messages
  base_url: http://{device_ip}  # HTTP interface for web configuration only
auth:
  type: none  # inferred: no auth procedure in source for UDP control
```

## Traits
```yaml
- powerable      # sequence command, outlet switching, and power cycle commands present
- queryable      # sendinfo, sendstatus, sendsettings, sendchild, sendfamily queries present
- routable       # SmartLink chain supports device enumeration and addressing by SmartLink address
```

## Actions
```yaml
- id: sequence
  label: Sequence
  kind: action
  params:
    - name: action
      type: integer
      description: "1 = initiate power turn-on sequence; 0 = initiate power turn-off sequence"
  description: Initiate a power turn-on or turn-off sequence for the entire chain of connected devices

- id: outlet
  label: Switch Outlet
  kind: action
  params:
    - name: id
      type: integer
      description: Outlet bank number (1-based)
    - name: state
      type: integer
      description: "0 = OFF; 1 = ON"
  description: Control an individual outlet on a connected SmartLink device

- id: cycleoutlet
  label: Cycle Outlet
  kind: action
  params:
    - name: id
      type: integer
      description: Outlet bank number (1-based)
    - name: delay
      type: integer
      required: false
      description: Delay in seconds (1–254). Outlet turns off then back on after this delay. Default 5 seconds.
  description: Power cycle an individual outlet

- id: settime
  label: Set Time
  kind: action
  params:
    - name: unix_timestamp
      type: integer
      description: UNIX timestamp (seconds since Jan 1 1970 UTC)
  description: Set the BB-RS232 internal clock. Not needed when connected to BlueBOLT cloud.

- id: setzoneinfo
  label: Set Timezone
  kind: action
  params:
    - name: timezone
      type: integer
      description: Seconds offset from UTC (e.g. -28800 for PST)
    - name: dststart
      type: integer
      description: UNIX timestamp for daylight savings start
    - name: dstshift
      type: integer
      description: Seconds to offset during DST (typically 3600)
    - name: dstend
      type: integer
      description: UNIX timestamp for daylight savings end
  description: Set the device timezone and DST rules

- id: enumerate
  label: Enumerate
  kind: action
  params: []
  description: Force rediscovery of the SmartLink chain. Rebuilds device inventory. Can take several minutes.

- id: rollcall
  label: Roll Call
  kind: action
  params: []
  description: Cause all SmartLink devices to report their SmartLink address. Non-destructive; does not reassign addresses.

- id: reboot
  label: Reboot
  kind: action
  params: []
  description: Reboot the BB-RS232 gateway

- id: refreshinfo
  label: Refresh Info
  kind: action
  params: []
  description: Force connected device to send updated system info to BB-RS232

- id: refreshsettings
  label: Refresh Settings
  kind: action
  params: []
  description: Force connected device to send updated settings to BB-RS232

- id: subscribe_events
  label: Subscribe to Events
  kind: action
  params:
    - name: uri
      type: string
      description: "Control system URI in format ctrlsys://IPADDR:PORT"
  description: Subscribe to asynchronous event messages sent to a specific IP and port

- id: unsubscribe_events
  label: Unsubscribe from Events
  kind: action
  params:
    - name: uri
      type: string
      description: "Control system URI in format ctrlsys://IPADDR:PORT"
  description: Unsubscribe from event messages

- id: event_ack
  label: Acknowledge Event
  kind: action
  params:
    - name: evtid
      type: integer
      description: Event ID to acknowledge
    - name: subsid
      type: integer
      description: Subscriber ID that received the event
  description: Send acknowledgement for a received event message
```

## Feedbacks
```yaml
- id: device_info
  label: Device Information
  kind: query
  params: []
  response: |
    <info time="unix_timestamp">
      <sernum>serial_number</sernum>
      <fwver>firmware_version</fwver>
      <bootcodever>bootloader_version</bootcodever>
      <ipaddr>ip_address_as_32bit_decimal</ipaddr>
    </info>
  # For SmartLink devices (cnxxxx, cnmp):
  # Also includes: <hwver>hardware_version</hwver> <sladdr>smartlink_address</sladdr>

- id: device_status
  label: Device Status
  kind: query
  params: []
  response: |
    <status time="unix_timestamp">
      <ntwkdevcnt>device_count</ntwkdevcnt>
      <ntwkinvhash>inventory_hash</ntwkinvhash>
      <ntwkpollstate>poll_state</ntwkpollstate>
      <hdlcstate>0xhex_value</hdlcstate>
      <tfilestate file_attributes/>
    </status>
  # For SmartLink devices:
  # <voltage>volts</voltage> <amperage>amps</amperage> <wattage>watts</wattage>
  # <pwrva>volt_amps</pwrva> <pwrfact>power_factor</pwrfact>
  # <per id='1'>packet_error_rate</per> <per id='2'>secondary_link_error_rate</per>
  # <remote>remote_input_level</remote> <protok>surge_protection_status</protok>
  # <smp>series_mode_relay_state</smp> <secok>secondary_link_status</secok>
  # <overvolt>overvoltage_status</overvolt> <undervolt>undervoltage_status</undervolt>
  # <pwrok>power_ok_status</pwrok> <seqprog>sequence_in_progress</seqprog>
  # <outlet id='n'>outlet_state</outlet>

- id: device_settings
  label: Device Settings
  kind: query
  params: []
  response: |
    <settings time="unix_timestamp">
      <adj>delay_adjustment_percent</adj>
      <delay>dip_switch_delay_seconds</delay>
      <totdelay>total_delay_seconds</totdelay>
      <mode>remote_input_mode</mode>
      <seq>sequence_mode</seq>
      <alarm>alarm_mode</alarm>
      <evs>extreme_voltage_shutdown_mode</evs>
      <override>override_switch_position</override>
      <evtsena>events_enabled</evtsena>
    </settings>

- id: child_info
  label: Child Device Info
  kind: query
  params:
    - name: ndx
      type: integer
      description: SmartLink index number (0-based)
  response: |
    <child class="device_class" id="device_id" [sladdr="address"]/>

- id: family_info
  label: Family / Device List
  kind: query
  params: []
  response: |
    <family>
      <kids class="device_class">
        <k>device_id</k>
        ...
      </kids>
      ...
    </family>

- id: sequence_done_event
  label: Sequence Done Event
  kind: event
  payload: |
    <seqdone>1</seqdone>  <!-- 1 = done; 0 = in process -->
  description: Posted when a power sequence completes or starts

- id: outlet_state_change_event
  label: Outlet State Change Event
  kind: event
  payload: |
    <outlet id="n">state</outlet>  <!-- 0 = OFF; 1 = ON -->
  description: Posted when any outlet bank changes state

- id: undervoltage_event
  label: Under Voltage Event
  kind: event
  payload: |
    <undervolt>state</undervolt>  <!-- 0 = normal; 1 = undervoltage condition -->
  description: Posted when device enters or exits undervoltage shutoff mode

- id: overvoltage_event
  label: Over Voltage Event
  kind: event
  payload: |
    <overvolt>state</overvolt>  <!-- 0 = normal; 1 = overvoltage condition -->
  description: Posted when device enters or exits overvoltage shutoff mode

- id: powerok_event
  label: Power OK Event
  kind: event
  payload: |
    <powerok>state</powerok>  <!-- 1 = normal; 0 = abnormal -->
  description: Posted when operating voltage enters or exits safe range

- id: alarm_event
  label: Alarm Event
  kind: event
  payload: |
    <alarm>state</alarm>  <!-- 1 = active; 0 = no alarm -->
  description: Posted when alarm input changes (latched; cleared with key on primary unit)

- id: protectok_event
  label: Protection OK Event
  kind: event
  payload: |
    <protectok>state</protectok>  <!-- 1 = ok; 0 = failed -->
  description: Posted when surge protection circuitry status changes

- id: reset_event
  label: Reset Event
  kind: event
  payload: |
    <reset>state</reset>  <!-- 1 = reset in progress; 0 = normal -->
  description: Posted when device enters or exits reset state

- id: enumerate_event
  label: Enumerate Event
  kind: event
  payload: |
    <enum phase="start|end" err="error_code"/>
  description: Posted when enumeration starts or ends

- id: enumerate_required_event
  label: Enumerate Required Event
  kind: event
  payload: |
    <enumreqd sladdr="n"/>
  description: Posted when a non-legitimate SmartLink address is detected

- id: rollcall_event
  label: Roll Call Event
  kind: event
  payload: |
    <roll phase="start|end" err="error_code"/>
  description: Posted when roll call starts or ends

- id: object_destroy_event
  label: Object Destroy Event
  kind: event
  payload: |
    <objdestroy class="device_class" id="serial_number" sladdr="address"/>
  description: Posted when a SmartLink device is removed from inventory

- id: object_create_event
  label: Object Create Event
  kind: event
  payload: |
    <objcreate class="device_class" id="serial_number" sladdr="address"/>
  description: Posted when a SmartLink device is added to inventory

- id: devcnt_event
  label: Device Count Event
  kind: event
  payload: |
    <devcnt>n</devcnt>
  description: Posted indicating number of devices in SmartLink chain

- id: ready_event
  label: Ready Event
  kind: event
  payload: |
    <ready class="device_class" id="serial_number" sladdr="n"/>
  description: Posted when all required data has been recorded for a device

- id: fwupgdreqd_event
  label: Firmware Upgrade Required Event
  kind: event
  payload: |
    <ready fwupgdreqd="device_class" sladdr="n"/>
  description: Posted when firmware update is necessary for a device

- id: hdlclink_event
  label: HDLC Link Event
  kind: event
  payload: |
    <hdlclink>status</hdlclink>  <!-- 1 = up; 0 = down -->
  description: Posted indicating status of HDLC link-level communication

- id: scheduled_action_event
  label: Scheduled Action Fired Event
  kind: event
  payload: |
    <schedmgr><fre><day>daysofweek</day><min>minuteofday</min><command><executed_cmd>...</executed_cmd></command></fre></schedmgr>
  description: Posted when BB-RS232 executes a scheduled operation
```

## Variables
```yaml
# No settable parameters that are not discrete actions are documented.
# All device settings (delay, mode, alarm, etc.) are read-only via sendsettings query.
```

## Events
```yaml
# See Feedbacks section — events are the same message types delivered asynchronously.
# Events require a separate subscription via <eventmgr><subscribe uri="ctrlsys://IPADDR:PORT"/>
# Events repeat until acknowledged or until ~20 minutes timeout.
# acknowledgement: <command><eventmgr><ack evtid="n" subsid="m"/></eventmgr></command>
```

## Macros
```yaml
# No explicit multi-step macros are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Alarm input is latched and must be explicitly cleared with the key on the primary unit.
```

## Notes

**Message Envelope:** All XML messages must include the XML declaration and a root `<device>` element with `class` and `id` attributes. The device class for BB-RS232 is `bb232`; identifiers are MAC addresses (no formatting). Connected SmartLink devices use their device class (e.g. `cn1800`, `cn2400`) and Device ID (serial number).

**Example device classes:**
| Model | Device Class |
|-------|-------------|
| BB-RS232 | bb232 |
| CN-1800 S | cn1800 |
| CN-2400 S | cn2400 |
| CN-3600 SE | cn3600 |
| CN-15MP | cnmp15 |
| CN-20MP | cnmp20 |

**IP address reporting:** The `<ipaddr>` field in `<sendinfo>` response is a 32-bit decimal value (e.g. `3194548209`), not a dotted-decimal string.

**Event subscription:** Devices must be subscribed individually. Only one IP address/port subscription is allowed per device. Events are not sent in reply to queries — they are autonomous notifications.

**Acknowledgement:** Commands with an optional `xid` attribute return an `<ack xid="value"/>` element.

<!-- UNRESOLVED: serial (RS-232) transport parameters (baud rate, data bits, parity, stop bits) are not stated in this document — the BB-RS232 is described as an Ethernet gateway, and the RS-232 side is assumed to connect to a host/automation controller rather than being a configurable parameter -->
<!-- UNRESOLVED: HTTP web interface is for configuration only; the primary control protocol is UDP XML on port 57010 -->
<!-- UNRESOLVED: no explicit firmware version compatibility range stated -->
<!-- UNRESOLVED: some event messages are marked "For Furman Sound use only" and not documented (schedmgr/setevent, seqchg, schedmgr/delevent, perchg, schedmgr/clearschedule, cmdconflict, fwupgd, loadfile, tfilebusy, tfilelock) -->
<!-- UNRESOLVED: scheduled action day encoding is a 7-bit bitmap in decimal; bit 0 = Thursday; this quirk may require client-side handling -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nortek_bluebolt_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T21:41:02.881Z
retrieved_at: 2026-04-25T21:41:02.881Z
last_checked_at: 2026-04-25T21:41:02.881Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:41:02.881Z
matched_actions: 36
action_count: 36
confidence: low
summary: "All 36 spec actions matched source commands; transport verified; complete protocol coverage"
```

## Known Gaps

```yaml
[]
```
