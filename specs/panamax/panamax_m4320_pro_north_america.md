---
spec_id: admin/panamax-m4320-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panamax M4320-PRO Control Spec"
manufacturer: Panamax
model_family: M4320-PRO
aliases: []
compatible_with:
  manufacturers:
    - Panamax
  models:
    - M4320-PRO
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - classic.mybluebolt.com
  - s3-us-west-1.amazonaws.com
  - applicationmarket.crestron.com
  - mybluebolt.com
source_urls:
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
  - https://applicationmarket.crestron.com/panamax-m4320-pro-north-america/
  - https://www.mybluebolt.com/developers
retrieved_at: 2026-04-26T19:14:16.343Z
last_checked_at: 2026-04-27T09:45:14.928Z
generated_at: 2026-04-27T09:45:14.928Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - sendinfo
  - sendstatus
  - sendchild
  - sendfamily
  - sendsettings
  - "M4320-PRO is not explicitly listed in the source device class table (Table 1 covers BB-RS232 and CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP). The device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source."
  - "Source describes the BB-RS232 gateway protocol; the M4320-PRO is a newer Panamax BlueBOLT-enabled device and may share the same UDP port 57010 transport but this is not explicitly confirmed in the source for the M4320-PRO specifically."
  - "these settings apply to the CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP"
  - "no multi-step macro sequences are described in the source."
  - "source does not contain explicit safety warnings, interlock procedures,"
  - "device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source."
  - "which subset of the BB-RS232 / SmartSequencer commands the M4320-PRO implements is not stated in the source."
  - "voltage, current, and power measurement fields (<voltage>, <amperage>, <wattage>) are documented for SmartSequencer devices but their applicability to the M4320-PRO is not stated."
  - "firmware version compatibility range not stated in source."
  - "HDLC link and SmartLink-chain concepts (ntwkdevcnt, hdlcstate, ntwkpollstate, tfilestate) are specific to BB-RS232 gateway operation and may not be exposed by the M4320-PRO."
verification:
  verdict: verified
  checked_at: 2026-04-27T09:45:14.928Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched literally to source commands; transport (port 80, UDP 57010, no auth) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Panamax M4320-PRO Control Spec

## Summary
The Panamax M4320-PRO is a 1U, 20A, 8-outlet IP-controlled power conditioner with BlueBOLT cloud management. This spec covers the BlueBOLT XML-over-UDP control protocol used by BlueBOLT-enabled devices for command, information, and event messaging on the local network.

<!-- UNRESOLVED: M4320-PRO is not explicitly listed in the source device class table (Table 1 covers BB-RS232 and CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP). The device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source. -->
<!-- UNRESOLVED: Source describes the BB-RS232 gateway protocol; the M4320-PRO is a newer Panamax BlueBOLT-enabled device and may share the same UDP port 57010 transport but this is not explicitly confirmed in the source for the M4320-PRO specifically. -->

## Transport
```yaml
protocols:
  - udp
  - http
addressing:
  port: 57010  # UDP port for XML command, information, and event messaging
  base_url: "http://<device-ip>/"  # built-in HTTP web interface for network configuration
auth:
  type: none  # inferred: no auth procedure described in source
```

## Traits
```yaml
- powerable       # inferred from power on/off sequence and outlet switch commands
- queryable       # inferred from sendinfo, sendstatus, sendchild, sendfamily, sendsettings queries
- routable        # inferred from per-outlet switch and cycle commands
```

## Actions
```yaml
# --- BB-RS232 gateway-level queries (Section 1) ---

- id: send_info
  label: Send Information Query (BB-RS232)
  kind: query
  command: "<sendinfo/>"
  params: []

- id: send_status
  label: Send Status Query (BB-RS232)
  kind: query
  command: "<sendstatus/>"
  params: []

- id: send_child
  label: Send Child Query (BB-RS232)
  kind: query
  command: "<sendchild ndx=\"{ndx}\"/>"
  params:
    - name: ndx
      type: integer
      description: SmartLink index number, starting at 0

- id: send_family
  label: Send Family Query (BB-RS232)
  kind: query
  command: "<sendfamily/>"
  params: []

# --- BB-RS232 gateway-level commands (Section 2) ---

- id: set_time
  label: Set Time
  kind: action
  command: "<settime>{unix_timestamp}</settime>"
  params:
    - name: unix_timestamp
      type: integer
      description: Number of seconds elapsed since January 1, 1970 (UNIX time)

- id: set_timezone
  label: Set Timezone
  kind: action
  command: |
    <setzoneinfo>
    <timezone>{offset}</timezone>
    <dststart>{dst_start}</dststart>
    <dstshift>{dst_shift}</dstshift>
    <dstend>{dst_end}</dstend>
    </setzoneinfo>
  params:
    - name: offset
      type: integer
      description: Seconds offset from UTC
    - name: dst_start
      type: integer
      description: UNIX timestamp of DST start
    - name: dst_shift
      type: integer
      description: Seconds to offset during DST (typically 3600)
    - name: dst_end
      type: integer
      description: UNIX timestamp of DST end

- id: enumerate
  label: Enumerate
  kind: action
  command: "<enumerate/>"
  params: []

- id: roll_call
  label: Roll Call
  kind: action
  command: "<rollcall/>"
  params: []

- id: reboot
  label: Reboot
  kind: action
  command: "<reboot/>"
  params: []

- id: sequence
  label: Power Sequence
  kind: action
  command: "<sequence>{action}</sequence>"
  params:
    - name: action
      type: integer
      description: 0 = power turn-off sequence; 1 = power turn-on sequence

# --- SmartSequencer device queries (Section 3) ---

- id: send_info_device
  label: Send Information Query (Device)
  kind: query
  command: "<sendinfo/>"
  params: []

- id: send_status_device
  label: Send Status Query (Device)
  kind: query
  command: "<sendstatus/>"
  params: []

- id: send_settings
  label: Send Settings Query (Device)
  kind: query
  command: "<sendsettings/>"
  params: []

# --- SmartSequencer device commands (Section 4) ---

- id: switch_outlet
  label: Switch Outlet
  kind: action
  command: "<outlet id=\"{n}\">{state}</outlet>"
  params:
    - name: n
      type: integer
      description: Outlet bank number
    - name: state
      type: integer
      description: 0 = OFF; 1 = ON

- id: cycle_outlet
  label: Cycle Outlet
  kind: action
  command: "<cycleoutlet id=\"{n}\" delay=\"{t}\"/>"
  params:
    - name: n
      type: integer
      description: Outlet bank number
    - name: t
      type: integer
      description: Delay in seconds (1-254); defaults to 5 if omitted

- id: sequence_device
  label: Device Power Sequence
  kind: action
  command: "<sequence>{on_off}</sequence>"
  params:
    - name: on_off
      type: integer
      description: 0 = power turn-off sequence; 1 = power turn-on sequence

- id: refresh_info
  label: Refresh Info
  kind: action
  command: "<refreshinfo/>"
  params: []

- id: refresh_settings
  label: Refresh Settings
  kind: action
  command: "<refreshsettings/>"
  params: []

# --- Event manager (Section 5.1) ---

- id: subscribe_events
  label: Subscribe to Event Messages
  kind: action
  command: "<eventmgr><subscribe uri=\"ctrlsys://{ipaddr}:{port}\"/></eventmgr>"
  params:
    - name: ipaddr
      type: string
      description: IP address that will receive event messages
    - name: port
      type: integer
      description: UDP port that will receive event messages

- id: unsubscribe_events
  label: Unsubscribe from Event Messages
  kind: action
  command: "<eventmgr><unsubscribe uri=\"ctrlsys://{ipaddr}:{port}\"/></eventmgr>"
  params:
    - name: ipaddr
      type: string
      description: Subscribed IP address
    - name: port
      type: integer
      description: Subscribed UDP port

- id: ack_event
  label: Acknowledge Event
  kind: action
  command: "<eventmgr><ack evtid=\"{evtid}\" subsid=\"{subsid}\"/></eventmgr>"
  params:
    - name: evtid
      type: integer
      description: Event ID from the received event message
    - name: subsid
      type: integer
      description: Subscriber ID assigned at subscription time
```

## Feedbacks
```yaml
- id: sernum
  type: string
  description: Device serial number (from <info><sernum>)

- id: fwver
  type: string
  description: Firmware version (from <info><fwver>)

- id: bootcodever
  type: string
  description: Boot loader firmware version (from <info><bootcodever>)

- id: ipaddr
  type: string
  description: IP address as 32-bit (base-10) decimal value (from <info><ipaddr>)

- id: ntwkdevcnt
  type: integer
  description: Count of SmartLink connected devices (from <status><ntwkdevcnt>)

- id: ntwkinvhash
  type: string
  description: Hash code of connected devices; changes if device chain changes (from <status><ntwkinvhash>)

- id: ntwkpollstate
  type: integer
  description: Polling state of device chain; for Furman Sound use only (from <status><ntwkpollstate>)

- id: hdlcstate
  type: string
  description: HDLC state with optional errs attribute indicating communication errors (from <status><hdlcstate>)

- id: hdlclink
  type: integer
  description: HDLC link state; 1 = link up, 0 = link down (from <status><hdlclink>)

- id: voltage
  type: number
  description: Measured RMS line voltage in 0.1Vac resolution (from <status><voltage>)

- id: amperage
  type: number
  description: Measured total load current in 0.01A resolution (from <status><amperage>)

- id: wattage
  type: number
  description: Measured total load power in 1W resolution (from <status><wattage>)

- id: pwrva
  type: number
  description: Measured volt-amperes in 1VA resolution (from <status><pwrva>)

- id: pwrfact
  type: number
  description: Measured power factor in 0.01 resolution (from <status><pwrfact>)

- id: per_primary
  type: number
  description: Packet error rate for primary link, 0.00 to 1.00 (from <per id="1">)

- id: per_secondary
  type: number
  description: Packet error rate for secondary link, 0.00 to 1.00 (from <per id="2">)

- id: remote_input
  type: integer
  description: Logic level of remote sensing input (from <status><remote>)

- id: surge_protection
  type: integer
  description: Surge protection circuit status; 1 = OK, 0 = no protection (from <status><protok>)

- id: smp_relay
  type: integer
  description: Series Mode Protection power relay state; 1 = on, 0 = off (from <status><smp>)

- id: secok
  type: integer
  description: Secondary SmartLink status; 1 = communicating, 0 = no response (from <status><secok>)

- id: overvolt
  type: integer
  description: Overvoltage status; 1 = overvoltage detected, 0 = normal (from <status><overvolt>)

- id: undervolt
  type: integer
  description: Undervoltage status; 1 = undervoltage detected, 0 = normal (from <status><undervolt>)

- id: pwrok
  type: integer
  description: Normal power condition; 1 = power OK, 0 = power fault (from <status><pwrok>)

- id: seqprog
  type: integer
  description: Power sequence status; 1 = sequence in progress, 0 = idle (from <status><seqprog>)

- id: outlet_state
  type: object
  description: Per-outlet bank state; key is outlet id (n), value 0 = OFF, 1 = ON (from <outlet id="n">)
```

## Variables
```yaml
# Settings retrieved via <sendsettings/> query on SmartSequencer devices.
# UNRESOLVED: these settings apply to the CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP
# family documented in the source. Whether the M4320-PRO exposes the same <settings>
# element is not stated in the source.

- id: adj
  type: number
  description: Delay time adjustment percentage of time set by DIP switch (from <settings><adj>)

- id: delay
  type: integer
  description: Time delay in seconds set by the DIP switches (from <settings><delay>)

- id: totdelay
  type: number
  description: Total delay time = delay * adj (from <settings><totdelay>)

- id: remote_input_mode
  type: integer
  description: Remote input operating mode: 0 = 12V off, 1 = 12V on, 2 = Ground on, 3 = MOM momentary (from <settings><mode>)

- id: sequence_mode
  type: integer
  description: Sequence mode; 1 = Primary, 0 = Secondary (from <settings><seq>)

- id: alarm_mode
  type: integer
  description: Alarm input mode; 1 = Normally Open, 0 = Normally Closed (from <settings><alarm>)

- id: evs_mode
  type: integer
  description: Extreme Voltage Shutdown mode; CN-xxxx: 1 = automatic, 0 = manual; MP-xxxx: 1 = on, 0 = off (from <settings><evs>)

- id: override
  type: integer
  description: Switch position for overriding remote commands; cnmp15/20: bypass 0=OFF, 1=ON; cn1800/2400/3600: Key 0=OFF, 1=ON, 2=REMOTE (from <settings><override>)

- id: events_enabled
  type: integer
  description: Events enabled; 1 = enabled, 0 = disabled (from <settings><evtsena>)
```

## Events
```yaml
# All events share a common <event time="..." evtid="..." subsid="..."> envelope.
# Events are repeated until acknowledged via the <eventmgr><ack> command or until
# a ~20 minute timeout elapses.

# --- BB-RS232 events (Section 6) ---

- id: enum_event
  type: object
  description: Enumerate started/ended notification
  payload:
    element: <enum phase="..." err="..."/>
    phase: start | end
    err: "timeout" | "blocked" | "no n,m..." (n,m = missing SmartLink addresses)

- id: enum_required_event
  type: object
  description: Non-legitimate SmartLink address detected; issue <enumerate/> to re-discover
  payload:
    element: <enumreqd sladdr="n"/>

- id: roll_event
  type: object
  description: Roll call started/ended notification
  payload:
    element: <roll phase="..." err="..."/>
    err: "timeout" | "blocked" | "dup n,m..." (duplicate SmartLink addresses)

- id: objdestroy_event
  type: object
  description: SmartLink device removed from internal inventory
  payload:
    element: <objdestroy class="..." id="..." sladdr="..."/>

- id: objcreate_event
  type: object
  description: SmartLink device added to internal inventory
  payload:
    element: <objcreate class="..." id="..." sladdr="..."/>

- id: devcnt_event
  type: object
  description: Number of devices on the SmartLink chain
  payload:
    element: <devcnt>n</devcnt>

- id: ready_event
  type: object
  description: All required data recorded in inventory for a device
  payload:
    element: <ready class="..." id="..." sladdr="..."/>

- id: fwupgdreqd_event
  type: object
  description: Firmware upgrade required for a device
  payload:
    element: <fwupgdreqd class="..." sladdr="..."/>

- id: hdlclink_event
  type: object
  description: HDLC link status; 1 = link up, 0 = link down
  payload:
    element: <hdlclink>1|0</hdlclink>

- id: scheduled_action_fired_event
  type: object
  description: Scheduled operation executed
  payload:
    element: <schedmgr><fre><day>...</day><min>...</min><command>...</command></fre></schedmgr>
    daysofweek: "7-bit binary bitmap in decimal; bit 0 = Thursday, bits 1-6 = Fri-Wed"

# --- SmartSequencer device events (Section 7) ---

- id: seqdone_event
  type: object
  description: Power on/off sequence initiated or completed
  payload:
    element: <seqdone>1|0</seqdone>
    state: "1 = sequence done, 0 = sequence in process"

- id: outlet_state_change_event
  type: object
  description: Outlet bank turned ON->OFF or OFF->ON
  payload:
    element: <outlet id="n">1|0</outlet>

- id: undervolt_event
  type: object
  description: Device entered or exited undervoltage shutoff mode
  payload:
    element: <undervolt>0|1</undervolt>

- id: overvolt_event
  type: object
  description: Device entered or exited overvoltage shutoff mode
  payload:
    element: <overvolt>0|1</overvolt>

- id: powerok_event
  type: object
  description: Operating voltage entered or exited the safe normal range
  payload:
    element: <powerok>1|0</powerok>

- id: alarm_event
  type: object
  description: Alarm input changed; latched, must be cleared with the key on the primary unit
  payload:
    element: <alarm>1|0</alarm>

- id: protectok_event
  type: object
  description: Surge protection circuit status changed
  payload:
    element: <protectok>1|0</protectok>

- id: reset_event
  type: object
  description: Device entered or exited reset state
  payload:
    element: <reset>1|0</reset>
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for the M4320-PRO. The <sequence> command and
# Extreme Voltage Shutdown (<evs>) settings imply surge-protection behavior, but
# the source does not state safety procedures for integrators.
```

## Notes
All messages are XML, UTF-8, and must include the `<?xml version="1.0" ?>` declaration. The root element must be `<device class="..." id="...">`. The `class` is the device type per Table 1; the `id` is the MAC address (BB-RS232) or 14-digit serial number (Furman Contractor Series). Messages without the XML declaration or with the wrong root element are ignored. The M4320-PRO is not in the device class table in the source — the class string and id format for the M4320-PRO on this XML protocol must be confirmed against M4320-PRO-specific documentation.

To receive unsolicited event messages, the control system must first send a `<eventmgr><subscribe uri="ctrlsys://IP:PORT"/></eventmgr>` command. Events are repeated every retransmission interval until acknowledged via `<eventmgr><ack evtid="..." subsid="..."/>` or until a ~20 minute timeout. Only one subscription per device is allowed.

The optional `xid` attribute on `<command>` causes the device to return an `<ack xid="..."/>` element in its response, useful for matching replies to outstanding requests.

The M4320-PRO is a Panamax (Nice North America) BlueBOLT-enabled product. The BB-RS232 protocol documented here is the local-network control protocol used by BlueBOLT gateway devices. The M4320-PRO may use a parallel XML-over-UDP protocol on UDP port 57010, or it may rely entirely on the BlueBOLT cloud REST API — the source does not state which transport the M4320-PRO exposes for direct local control. A separate, M4320-PRO-specific protocol document is required to confirm device class, identifier format, and the set of supported commands and status fields.

<!-- UNRESOLVED: device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source. -->
<!-- UNRESOLVED: which subset of the BB-RS232 / SmartSequencer commands the M4320-PRO implements is not stated in the source. -->
<!-- UNRESOLVED: voltage, current, and power measurement fields (<voltage>, <amperage>, <wattage>) are documented for SmartSequencer devices but their applicability to the M4320-PRO is not stated. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: HDLC link and SmartLink-chain concepts (ntwkdevcnt, hdlcstate, ntwkpollstate, tfilestate) are specific to BB-RS232 gateway operation and may not be exposed by the M4320-PRO. -->

## Provenance

```yaml
source_domains:
  - classic.mybluebolt.com
  - s3-us-west-1.amazonaws.com
  - applicationmarket.crestron.com
  - mybluebolt.com
source_urls:
  - https://classic.mybluebolt.com/downloads/BB-RS232-COM-PROT-10006527-A.pdf
  - https://s3-us-west-1.amazonaws.com/corebrands-resources/products/BLUEBOLT-CV2/pdf_BlueBOLT-CV2_manual.pdf
  - https://applicationmarket.crestron.com/panamax-m4320-pro-north-america/
  - https://www.mybluebolt.com/developers
retrieved_at: 2026-04-26T19:14:16.343Z
last_checked_at: 2026-04-27T09:45:14.928Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:45:14.928Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched literally to source commands; transport (port 80, UDP 57010, no auth) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- sendinfo
- sendstatus
- sendchild
- sendfamily
- sendsettings
- "M4320-PRO is not explicitly listed in the source device class table (Table 1 covers BB-RS232 and CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP). The device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source."
- "Source describes the BB-RS232 gateway protocol; the M4320-PRO is a newer Panamax BlueBOLT-enabled device and may share the same UDP port 57010 transport but this is not explicitly confirmed in the source for the M4320-PRO specifically."
- "these settings apply to the CN-1800S / CN-2400S / CN-3600SE / CN-15MP / CN-20MP"
- "no multi-step macro sequences are described in the source."
- "source does not contain explicit safety warnings, interlock procedures,"
- "device class string and identifier format for the M4320-PRO on the BlueBOLT XML protocol are not stated in the source."
- "which subset of the BB-RS232 / SmartSequencer commands the M4320-PRO implements is not stated in the source."
- "voltage, current, and power measurement fields (<voltage>, <amperage>, <wattage>) are documented for SmartSequencer devices but their applicability to the M4320-PRO is not stated."
- "firmware version compatibility range not stated in source."
- "HDLC link and SmartLink-chain concepts (ntwkdevcnt, hdlcstate, ntwkpollstate, tfilestate) are specific to BB-RS232 gateway operation and may not be exposed by the M4320-PRO."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
