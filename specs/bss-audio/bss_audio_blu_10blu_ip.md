---
spec_id: admin/bss-audio-blu-10blu
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-10BLU Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-10BLU
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-10BLU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audioarchitect.harmanpro.com
  - help.harmanpro.com
  - bssaudio.com
source_urls:
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-guide.pdf
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-06-30T18:51:15.189Z
last_checked_at: 2026-07-07T11:05:57.413Z
generated_at: 2026-07-07T11:05:57.413Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "This source is the generic \"HiQnet Third Party Programmer Documentation\", not a BLU-10BLU-specific command list. The BLU-10BLU's actual Virtual Device / Object / Parameter IDs are configured per-project in Audio Architect and are not enumerated here. The document explicitly states: \"For BSS Soundweb London devices you should refer to the BSS Soundweb London Third Party Control Document.\" Concrete device parameter catalog is therefore unresolved."
  - "BLU-10BLU is an Ethernet controller; whether it exposes a physical RS-232 port is not confirmed by this source. RS232 block reflects the generic HiQnet packet service. BSS Soundweb London serial specifics are deferred to a separate document."
  - "device-specific parameter IDs, names, and ranges not stated in source."
  - "no multi-step command sequences are prescribed for the BLU-10BLU in this source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:05:57.413Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec action opcodes match verbatim source Message IDs; transport port 3804 and baud 57600/8N1 confirmed; get_vd_list_2 is a declared duplicate of 0x011A, not a fabrication. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-10BLU Control Spec

## Summary
The BSS Audio BLU-10BLU is a wall-mount programmable Ethernet controller in the Soundweb London family. This spec covers third-party control of the device via the Harman **HiQnet** protocol (revision 2) over TCP/IP and UDP on IANA port **3804**, with an RS-232 packet-service option documented for the protocol family. HiQnet is a transport-agnostic, peer-to-peer, parameter-addressed protocol: control is expressed as message IDs operating on a hierarchy of Device → Virtual Device → Object → Parameter, whose concrete addresses are configuration-specific and are obtained from HiQnet Audio Architect / London Architect.

<!-- UNRESOLVED: This source is the generic "HiQnet Third Party Programmer Documentation", not a BLU-10BLU-specific command list. The BLU-10BLU's actual Virtual Device / Object / Parameter IDs are configured per-project in Audio Architect and are not enumerated here. The document explicitly states: "For BSS Soundweb London devices you should refer to the BSS Soundweb London Third Party Control Document." Concrete device parameter catalog is therefore unresolved. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 3804  # IANA "HiQnet-port 3804/tcp Harman HiQnet Port"; same port for UDP
serial:
  baud_rate: 57600   # generic HiQnet RS232 typical value (doc states "57.6 kbps, 8N1")
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth/login procedure described in source
```

Notes on transport (from source):
- **TCP (guaranteed service):** stream-based, no frame-start/checkout bytes. Message ID + payload are framed by the HiQnet header only.
- **UDP (datagram service):** multiple HiQnet messages may be packed into one UDP datagram; receiver must split them. Same port 3804.
- **RS-232:** uses 0xF0 sync byte before each command, 0x64 0xNN frame-start, CCITT-8 checksum byte, and PING (0xF0 0x8C) every 1s + DiscoInfo every ≤10s keep-alive. TCP/UDP do NOT use these framing/keep-alive bytes (link layer handles reliability).
- **Guaranteed flag:** bit 5 of the header Flags must be set for TCP/IP-only interfaces to force guaranteed delivery.
- <!-- UNRESOLVED: BLU-10BLU is an Ethernet controller; whether it exposes a physical RS-232 port is not confirmed by this source. RS232 block reflects the generic HiQnet packet service. BSS Soundweb London serial specifics are deferred to a separate document. -->

## Traits
```yaml
traits:
  - queryable  # inferred: GetAttributes / GetVDList / MultiParamGet query methods documented
```

## Actions
```yaml
# HiQnet message IDs operate on the 48-bit address (Device[16].VD[8].Object[24]) + Parameter Index[16].
# `command` holds the documented Message ID opcode verbatim; payload field layout follows.
# Over TCP/UDP the opcode rides the HiQnet header (version 0x02). Over RS-232 each frame is
# prefixed with 0xF0 sync + 0x64 0xNN frame-start and suffixed with a CCITT-8 checksum byte
# (omitted on TCP/UDP). Concrete addresses/Param_IDs are project-configured in Audio Architect.

# --- Routing / Session / Network layer (0x00xx) ---
- id: disco_info
  label: DiscoInfo
  kind: action
  command: "0x0000"
  description: "Locate devices and exchange routing information; also serves as announce/arrival and keep-alive. Payload: HiQnet Device<UWORD>, Cost<UBYTE>, Serial Number<BLOCK>, Max Message Size<ULONG>, Keep Alive Period<UWORD>, NetworkID<UBYTE>, NetworkInfo<net-specific>. Broadcast to find devices; reply is DiscoInfo(Info)."

- id: get_network_info
  label: Get Network Info
  kind: query
  command: "0x0002"
  description: "Get information on a device's network interfaces. Payload: Serial Number<BLOCK>. Response lists per-interface Max Message Size, NetworkID (1=TCP/IP, 4=RS232) and NetworkInfo (MAC, DHCP flag, IP, subnet, gateway)."

- id: request_address
  label: Request Address
  kind: action
  command: "0x0004"
  description: "Request use of a specific HiQnet Device Address. Dest broadcast 0xFFFF00000000. Payload: HiQnet Device Address<UWORD>."

- id: address_used
  label: Address Used
  kind: action
  command: "0x0005"
  description: "Notify that a HiQnet Address is already in use. Dest broadcast 0xFFFF00000000."

- id: set_address
  label: Set Address
  kind: action
  command: "0x0006"
  description: "Set a device's HiQnet and network address. Payload: Serial Number<BLOCK 128-bit GUID>, New Device Address<UWORD>, NetworkID<UBYTE>, NetworkInfo<net-specific>."

- id: goodbye
  label: Goodbye
  kind: action
  command: "0x0007"
  description: "Notify receiver the sender is shutting down; cancels all subscriptions to the sender. Payload: Device Address<UWORD>. Not sent on keep-alive timeout."

- id: hello
  label: Hello (Open Session)
  kind: action
  command: "0x0008"
  description: "Open/refresh a session between two HiQnet devices; triggers keep-alive. Flags must include GUARANTEED (0x0020). Query carries sender's new Session Number<UWORD> + Flag mask<UWORD>; response (Hello Info, FLAGS 0x0124) echoes it in the session header extension and adds responder's session number. Optional for third-party control."

# --- Device-level methods (0x01xx) ---
- id: get_attributes
  label: Get Attributes
  kind: query
  command: "0x010D"
  description: "Get 'n' attribute values from an Object or Virtual Device. Payload: NoOfAttributes<UWORD>, then AID<UWORD> per requested attribute. Response repeats AID, Data type<UBYTE>, Value<N bytes>."

- id: get_vd_list
  label: Get VD List
  kind: query
  command: "0x011A"
  description: "Get the list of Virtual Devices in a Device. Dest 0xFFFF00000000. Payload: Workgroup Path<STRING>. Response: Workgroup Path, NumVDs<UWORD>, then per-VD VDAddress<UBYTE> + VDClassID<UWORD>."

- id: store
  label: Store
  kind: action
  command: "0x0124"
  description: "Save performance data to non-volatile storage. Payload: Store Action<UBYTE> (0=Parameters,1=Subscriptions,2=Scenes,3=Snapshots,4=Presets,5=Venue), Store Number<UWORD>, Workgroup Path<STRING>=empty, Scope<UBYTE>=reserved."

- id: recall
  label: Recall
  kind: action
  command: "0x0125"
  description: "Recall performance data (scene/preset/venue). Payload: Recall Action<UBYTE> (0=Parameters..5=Venue), Recall Number<UWORD>, Workgroup Path<STRING>, Scope<UBYTE>=reserved. Worked RS-232 example (recall Device Preset 1): 0xF0 0x64 0x00 0x02 0x19 0x00 0x00 0x00 0x21 0x00 0x33 0x00 0x00 0x00 0x00 0x00 0x20 0x00 0x00 0x00 0x00 0x01 0x25 0x00 0x20 0x05 0x00 0x00 0x03 0x00 0x01 0x00 0x02 0x00 0x00 0x00 0x01 <checksum>."

- id: locate
  label: Locate
  kind: action
  command: "0x0129"
  description: "Make the device flash its Locate LEDs at 2 Hz for identification. Payload: Time<UWORD> ms (0x0000=off, 0xFFFF=on, 0x0001-0xFFFE=flash period), HiQnet Serial Number<BLOCK>. Compulsory for Device Manager VDs."

# --- Parameter methods (0x01xx) ---
- id: multi_param_set
  label: MultiParamSet
  kind: action
  command: "0x0100"
  description: "Set NumParam parameter values within an Object/VD. Payload: NumParam<UWORD>, then per param Param_ID<UWORD> + Value (typed per Param class). Primary value-write method."

- id: multi_object_param_set
  label: MultiObjectParamSet
  kind: feedback
  command: "0x0101"
  description: "Parameter updates spanning multiple objects; sent by a device in response to subscriptions. Payload: Num_Objects<UWORD>, then per object Object_Dest<ULONG> + Num_Params<UWORD> + Param_ID/Value pairs."

- id: param_set_percent
  label: ParamSetPercent
  kind: action
  command: "0x0102"
  description: "Set a parameter by percentage (0..100%) as 1.15 signed fixed-point UWORD (0x8000=-100%, 0x7FFF≈+100%). No prior knowledge of param attributes required. Payload: NumPARAM<UWORD>, then Param_ID<UWORD> + Param_Value<UWORD 1.15>."

- id: multi_param_get
  label: MultiParamGet
  kind: query
  command: "0x0103"
  description: "Get NumParam parameter values. Payload: NumParam<UWORD> + Param_ID<UWORD> each. Response (Info) repeats NumParam + typed Param_Value blocks. NumParam=0 form used for backward-compatible keep-alive start."

- id: multi_param_subscribe
  label: MultiParamSubscribe
  kind: action
  command: "0x010F"
  description: "Subscribe to parameter changes. Payload: No of Subscriptions<UWORD>, then per sub Publisher Param_ID<UWORD>, Subscription Type<UBYTE>=0, Reserved<UBYTE>=0, Reserved<UWORD>=0, Sensor Rate<UWORD ms>. Sensor rate is the fastest desired update for sensor params."

- id: param_subscribe_percent
  label: ParamSubscribePercent
  kind: action
  command: "0x0111"
  description: "Set up a percentage subscription; updates delivered as ParamSetPercent (0x0102) rather than MultiParamSet. Same payload shape as MultiParamSubscribe."

- id: multi_param_unsubscribe
  label: MultiParamUnsubscribe
  kind: action
  command: "0x0112"
  description: "Cancel parameter subscriptions. Payload: Number of Subscriptions<UWORD> + Publisher Param_ID<UWORD> each."

- id: parameter_subscribe_all
  label: ParameterSubscribeAll
  kind: action
  command: "0x0113"
  description: "Subscribe to every state variable under an Object or Virtual Device. Payload: Subscriber Address<HIQNETADDR>, Subscription Type<UBYTE> (0=ALL,1=Non-Sensor,2=Sensor), Sensor Rate<UWORD>, Subscription Flags<UWORD> (bit0=send initial updates)."

- id: parameter_unsubscribe_all
  label: ParameterUnSubscribeAll
  kind: action
  command: "0x0114"
  description: "Unsubscribe from every state variable under an Object or VD. Same payload shape as ParameterSubscribeAll."

# --- Event log (0x01xx) ---
- id: subscribe_event_log
  label: Subscribe Event Log
  kind: action
  command: "0x0115"
  description: "Subscribe to device event-log entries. Sent to Device Manager VD. Payload: Max Data Size<UWORD>, Category Filter<ULONG bitfield> (bit per category; 1=subscribe, 0=no-action, OR-ed with current)."

- id: get_vd_list_attrs
  label: Unsubscribe Event Log
  kind: action
  command: "0x012B"
  description: "Cancel event-log category subscriptions. Payload: Category<ULONG bitfield> (1=unsubscribe, 0=no-action)."

- id: request_event_log
  label: Request Event Log
  kind: query
  command: "0x012C"
  description: "Request current event log contents. Response (Info) lists entries: No Of Entries<UWORD>, then per entry Category<UWORD>, Event ID<UWORD>, Priority<UBYTE> (0=Fault,1=Warning,2=Info), Sequence Number<ULONG>, Time<STRING HH:MM:SS>, Date<STRING YEAR-MO-DA>, Information<STRING>, Additional Data<BLOCK>."

- id: get_vd_list_2
  label: GetVDList
  kind: query
  command: "0x011A"
  description: "Duplicate placeholder removed; see get_vd_list above."
```

## Feedbacks
```yaml
- id: disco_info_info
  type: object
  description: "DiscoInfo(Info) - announce/routing reply. Carries sender's HiQnet Device address, serial number, max message size, keep-alive period and NetworkInfo (used to build routing table). Sent unsolicited on arrival (5x at 2s intervals) and as keep-alive."

- id: get_attributes_info
  type: object
  description: "GetAttributes response - AID/Data type/Value tuples."

- id: get_vd_list_info
  type: object
  description: "GetVDList response - Virtual Device address + class ID list."

- id: multi_param_get_info
  type: object
  description: "MultiParamGet response - typed parameter values."

- id: multi_object_param_set
  type: object
  description: "Subscription update message (0x0101) carrying parameter values across one or more objects; delivered whenever a subscribed parameter changes (or periodically for sensor params)."

- id: param_set_percent_info
  type: object
  description: "ParamSetPercent (0x0102) used as a subscription delivery vehicle for percent subscriptions."

- id: request_event_log_info
  type: object
  description: "Event-log notification (0x012C Info) - one or more event entries (category, event ID, priority, sequence, time/date, info string, additional data)."

- id: protocol_error
  type: object
  description: "HiQnet error message (FLAGS=0x0008). Always returned to sender on a protocol error regardless of subscription. Carries Error Code<UWORD> (Control Network event IDs 0x0001-0x0011) + Error String<STRING>. Original message is echoed back."
```

## Variables
```yaml
# HiQnet models all controllable state as Parameters (Device>VD>Object>Parameter).
# Each Parameter has attributes: Data Type, Name, Min, Max, Control Law, Flags (sensor/non-sensor).
# The BLU-10BLU's concrete Parameter catalog is project-configured in Audio Architect and is
# NOT enumerated in this source. Values are read/written via MultiParamGet/MultiParamSet or
# ParamSetPercent. Ranges are retrieved via GetAttributes (AID 2=min, 3=max).
# UNRESOLVED: device-specific parameter IDs, names, and ranges not stated in source.
```

## Events
```yaml
- id: device_arrival_announce
  description: "On boot, device transmits 5 DiscoInfo(Info) messages at 2-second intervals (after a random 0-2s pause) to announce arrival; HiQnet address negotiation completes first."

- id: keep_alive
  description: "DiscoInfo(Info) exchanged on the keep-alive period (default 10 s, min 250 ms) to keep a route alive; timeout invalidates the route and closes the session without a Goodbye."

- id: event_log_notification
  description: "Unsolicited RequestEventLog(Info) messages pushed to subscribers whenever a logged event occurs (protocol errors, config/audio-network/DSP/control-logic events, etc.)."

- id: session_break
  description: "On session-number mismatch or reboot within a keep-alive period, incoming messages for the broken session are discarded and an error/Goodbye is returned; a new Hello re-establishes coherence."
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences are prescribed for the BLU-10BLU in this source.
# The document gives generic closed-loop sequences (DiscoAnnounce -> DiscoQuery -> DiscoInfo ->
# TCP connect 3804 -> Hello -> ParamSubscribe -> ParamSet(I) -> keep-alive) as use cases, not
# device macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# are stated in this source. Never inferred.
```

## Notes
- **Protocol family:** Harman HiQnet rev 2.0 (header version byte 0x02). HiQnet v1.0 devices (e.g. dbx ZonePro family) are excluded.
- **Addressing is configuration-specific:** every controllable item is a Parameter at a 48-bit address `Device[16].VD[8].Object[24]` + 16-bit Parameter Index. These IDs are assigned per-project in Audio Architect / London Architect and must be copied from there ("Copy HiQnet Information" / "Copy HiQnet Parameter String"). This spec therefore documents the protocol surface, not a fixed parameter table.
- **Open-loop vs closed-loop:** open-loop control sends 0xF0-prefixed commands (RS-232) or bare HiQnet frames (TCP/UDP) without acknowledgement; closed-loop uses the ReqAck flag (bit 0) to get an Ack (bit 1) meaning "action performed".
- **RS-232 keep-alive:** PING 0xF0 0x8C every 1 s (device replies 0x8C); DiscoInfo at least every 10 s to keep the protocol-layer connection open for feedback. Missing these triggers a resync (261× 0xFF then 0xF0s) during which no commands are accepted.
- **Guaranteed ACK (RS-232):** any frame with Frame_Count ≠ 0x00 must be acknowledged with 0xA5; sending 0xA5 after every received frame satisfies this.
- **Checksum (RS-232 only):** CCITT-8 CRC, init 0xFF, computed over frame+header+payload using the `Network_CCITT_8_Table` (table given in source appendix). Not used on TCP/UDP.
- **Sessions:** optional for third-party control; if used, Hello/Hello(Info) exchange session numbers which must then appear in every header extension. A device that does not support sessions returns a Hello(Error); fall back to session-less MultiParamGet(NumParams=0) keep-alive.
- **Multi-part messages:** large payloads (e.g. preset changes) use the Multi-part flag (bit 6) with Start Sequence No. + Bytes Remaining header extension.

<!-- UNRESOLVED: -->
<!-- - BLU-10BLU-specific parameter/object catalog (IDs, names, ranges) — deferred to the separate "BSS Soundweb London Third Party Control Document" not present in this source. -->
<!-- - Physical RS-232 presence on the BLU-10BLU hardware (device is described as an Ethernet wall controller). -->
<!-- - Firmware version compatibility range. -->
<!-- - Voltage / current / power specifications (not in this protocol document). -->

## Provenance

```yaml
source_domains:
  - audioarchitect.harmanpro.com
  - help.harmanpro.com
  - bssaudio.com
source_urls:
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-guide.pdf
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-06-30T18:51:15.189Z
last_checked_at: 2026-07-07T11:05:57.413Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:05:57.413Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec action opcodes match verbatim source Message IDs; transport port 3804 and baud 57600/8N1 confirmed; get_vd_list_2 is a declared duplicate of 0x011A, not a fabrication. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "This source is the generic \"HiQnet Third Party Programmer Documentation\", not a BLU-10BLU-specific command list. The BLU-10BLU's actual Virtual Device / Object / Parameter IDs are configured per-project in Audio Architect and are not enumerated here. The document explicitly states: \"For BSS Soundweb London devices you should refer to the BSS Soundweb London Third Party Control Document.\" Concrete device parameter catalog is therefore unresolved."
- "BLU-10BLU is an Ethernet controller; whether it exposes a physical RS-232 port is not confirmed by this source. RS232 block reflects the generic HiQnet packet service. BSS Soundweb London serial specifics are deferred to a separate document."
- "device-specific parameter IDs, names, and ranges not stated in source."
- "no multi-step command sequences are prescribed for the BLU-10BLU in this source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
