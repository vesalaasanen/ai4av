---
spec_id: admin/bss-audio-dci-2-600n
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio DCi 2 600N Control Spec"
manufacturer: "BSS Audio"
model_family: "DCi 2 600N"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "DCi 2 600N"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audioarchitect.harmanpro.com
  - bssaudio.com
  - crownaudio.com
source_urls:
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-guide.pdf
  - https://bssaudio.com/en/site_elements/drivecore-install-network-manual-english
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-quick-start-guide.pdf
  - https://www.crownaudio.com/en/softwares/crown-dci-q-sys-plugin-v1-4-1
retrieved_at: 2026-06-30T03:35:22.682Z
last_checked_at: 2026-10-07T12:45:22.492Z
generated_at: 2026-10-07T12:45:22.492Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic HiQnet programmer doc, not a DCi 2 600N device-specific parameter catalogue. Object IDs, Parameter IDs, and per-channel controls (mute, gain, routing, presets per channel) for the DCi 2 600N are not listed."
  - "firmware version compatibility not stated in source"
  - "power/voltage/current specifications not in this source"
  - "Device-specific parameters (channel gain, mute, source/router, presets, DSP objects, meters) for the DCi 2 600N are not enumerated in this generic HiQnet programmer document. Parameter Class IDs, min/max, control laws, and Object/Parameter addresses must be obtained from a Soundweb London / DCi parameter map or via System Architect \"Copy HiQnet Information\"."
  - "device-emitted unsolicited events (other than subscription updates and event-log pushes already covered in Feedbacks) are not enumerated for the DCi 2 600N in this source."
  - "no multi-step sequences are explicitly authored for the DCi 2 600N in the source. The closed-loop TCP/IP use case (§4.5.5) describes a recommended session establishment sequence but it is generic guidance, not a device macro."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements are documented in this source. Power amplifier output protection, clip/limiter behaviour, and load-impedance handling are not covered."
  - "DCi 2 600N-specific RS232 baud rate (the 57.6 kbps figure in §6.1.1 is stated for dbx HiQnet Devices, not BSS Audio)."
  - "voltage, current, and power specifications not in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:45:22.492Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 action units map to documented HiQnet message IDs and port 3804/tcp is confirmed; the source is a generic HiQnet guide (no DCi model named) and AddressUsed has a documented 0x0004/0x0005 conflict. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio DCi 2 600N Control Spec

## Summary
Networked 2-channel power amplifier in the BSS Audio / Crown DCi family, controlled via the Harman HiQnet protocol. This spec covers HiQnet message-level control over TCP/IP (port 3804). The source is the generic HiQnet Third Party Programmer Documentation; device-specific parameter Object/Parameter IDs are not enumerated there and must be obtained via System Architect or a Soundweb London control document.

<!-- UNRESOLVED: source is generic HiQnet programmer doc, not a DCi 2 600N device-specific parameter catalogue. Object IDs, Parameter IDs, and per-channel controls (mute, gain, routing, presets per channel) for the DCi 2 600N are not listed. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: power/voltage/current specifications not in this source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 3804
  base_url: ""
auth:
  type: UNRESOLVED
```

Authentication requirements are not stated in the source. Session numbers (Hello/HelloInfo, §7) are optional coherency tokens, not credentials.

RS232 is also defined in the source as a HiQnet packet service (6.1.1 states "dbx HiQnet Devices are fixed at 57.6 kbps, 8N1" — that is dbx-specific, not BSS Audio). Serial config for the DCi 2 600N is therefore not stated in this source and omitted.

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

Traits inferred from documented HiQnet message primitives: `powerable` (param set/get on power state params), `queryable` (GetAttributes / MultiParamGet), `levelable` (ParamSetPercent and gain params), `routable` (router/source-select example in §6.1.10). Device-specific confirmation requires the DCi parameter map.

## Actions
```yaml
actions:
  - id: get_attributes
    label: GetAttributes
    kind: query
    command: "0x010D"
    description: "Get n attribute values from an Object or Virtual Device."
    params:
      - name: no_of_attributes
        type: integer
        description: "UWORD count of AIDs that follow"
      - name: attribute_ids
        type: array
        description: "List of zero-based UWORD Attribute IDs"
  - id: get_vd_list
    label: GetVDList
    kind: query
    command: "0x011A"
    description: "Get list of Virtual Devices in a Device. Destination address 0xFFFF00000000."
    params:
      - name: workgroup_path
        type: string
        description: "Workgroup asked to respond"
  - id: store
    label: Store
    kind: action
    command: "0x0124"
    description: "Store performance data to non-volatile local storage (FLASH)."
    params:
      - name: store_action
        type: integer
        description: "0=Parameters, 1=Subscriptions, 2=Scenes, 3=Snapshots, 4=Presets, 5=Venue"
      - name: store_number
        type: integer
        description: "UWORD local storage space identifier"
      - name: workgroup_path
        type: string
        description: "Not used; set length to 0"
      - name: scope
        type: integer
        description: "UBYTE reserved for automation"
  - id: recall
    label: Recall
    kind: action
    command: "0x0125"
    description: "Recall performance data. Recall Action 2=Scene, 3=Snapshot, 4=Preset, 5=Venue."
    params:
      - name: recall_action
        type: integer
        description: "0=Parameters, 1=Subscriptions, 2=Scenes, 3=Snapshots, 4=Presets, 5=Venue"
      - name: recall_number
        type: integer
        description: "UWORD storage space or venue recall number"
      - name: workgroup_path
        type: string
        description: "Workgroup doing Recall Venue; otherwise 0"
      - name: scope
        type: integer
        description: "UBYTE reserved for automation"
  - id: locate
    label: Locate
    kind: action
    command: "0x0129"
    description: "Flash Locate LEDs to identify the device to the operator. Compulsory on Device Manager VD."
    params:
      - name: time
        type: integer
        description: "UWORD ms. 0x0000=off, 0xFFFF=on, 0x0001-0xFFFE=flash period (2Hz)"
      - name: hiqnet_serial_number
        type: string
        description: "BLOCK serial number of Device to be located"
  - id: multi_param_set
    label: MultiParamSet
    kind: action
    command: "0x0100"
    description: "Set NumParam parameter values within an Object or Virtual Device."
    params:
      - name: num_param
        type: integer
        description: "UWORD count of Param_ID/Param_Value pairs"
  - id: multi_param_get
    label: MultiParamGet
    kind: query
    command: "0x0103"
    description: "Get NumParam parameter values within an Object or Virtual Device."
    params:
      - name: num_param
        type: integer
        description: "UWORD count of Param_IDs"
  - id: multi_param_subscribe
    label: MultiParamSubscribe
    kind: action
    command: "0x010F"
    description: "Subscribe to publisher params; receive MultiParamSet updates on change. Sensor rate is fastest update requested."
    params:
      - name: no_of_subscriptions
        type: integer
        description: "UWORD count of subscription entries"
  - id: multi_param_unsubscribe
    label: MultiParamUnsubscribe
    kind: action
    command: "0x0112"
    description: "Cancel parameter subscriptions by Publisher Param_ID."
    params:
      - name: number_of_subscriptions
        type: integer
        description: "UWORD count of Publisher Param_IDs"
  - id: multi_object_param_set
    label: MultiObjectParamSet
    kind: action
    command: "0x0101"
    description: "Device-emitted message encoding parameter values across multiple objects. Num_Objects, then per-object Object_Dest (ULONG) + Num_Params (UWORD) + values."
    params:
      - name: num_objects
        type: integer
        description: "UWORD count of objects"
  - id: param_set_percent
    label: ParamSetPercent
    kind: action
    command: "0x0102"
    description: "Set params via 0-100% percentage; 1.15 signed fixed-point UWORD (0x8000=-100%, 0x7FFF=~+100%). No prior knowledge of param attributes required."
    params:
      - name: num_param
        type: integer
        description: "UWORD count of PARAM_ID/percentage pairs"
  - id: param_subscribe_percent
    label: ParamSubscribePercent
    kind: action
    command: "0x0111"
    description: "Subscribe to params; updates sent as ParamSetPercent messages. Same payload as MultiParamSubscribe."
    params:
      - name: no_of_subscriptions
        type: integer
        description: "UWORD count of subscription entries"
  - id: parameter_subscribe_all
    label: ParameterSubscribeAll
    kind: action
    command: "0x0114"
    description: "Subscribe to every state variable under an Object or Virtual Device."
    params:
      - name: subscription_type
        type: integer
        description: "UBYTE: 0=ALL, 1=Non-Sensor, 2=Sensor"
  - id: parameter_unsubscribe_all
    label: ParameterUnSubscribeAll
    kind: action
    command: "0x0114"
    description: "Unsubscribe from every state variable under an Object or Virtual Device. Distinct invocation of the 0x0114 opcode with unsubscribe semantics."
    params:
      - name: subscription_type
        type: integer
        description: "UBYTE: 0=ALL, 1=Non-Sensor, 2=Sensor"
  - id: feedback_subscribe
    label: ParameterSubscribe (Feedback)
    kind: action
    command: "0x0113"
    description: "Subscribe to a specific parameter to receive change feedback (MSG_ID 0x0113). Continues until unsubscribe or power loss."
    params:
      - name: subscriber_address
        type: string
        description: "UWORD:ULONG HiQnet address 0xNODEVDOBJECT"
      - name: subscription_type
        type: integer
        description: "UBYTE: 0=ALL, 1=Non-Sensor, 2=Sensor"
      - name: sensor_rate
        type: integer
        description: "UWORD period in ms"
      - name: subscription_flags
        type: integer
        description: "UWORD; bit 0 set = send initial updates"
  - id: disco_info
    label: DiscoInfo
    kind: action
    command: "0x0000"
    description: "Routing-layer message. Query form DiscoInfo(Q) finds devices; Info form DiscoInfo(I) announces/replies. Payload: HiQnet Device, Cost, Serial Number, Max Message Size, Keep Alive Period, NetworkID, NetworkInfo."
    params:
      - name: hiqnet_device
        type: integer
        description: "UWORD sender device address"
      - name: cost
        type: integer
        description: "UBYTE aggregated route cost back to source"
      - name: serial_number
        type: string
        description: "BLOCK sender HiQnet serial number"
      - name: max_message_size
        type: integer
        description: "ULONG"
      - name: keep_alive_period
        type: integer
        description: "UWORD ms; minimum 250"
      - name: network_id
        type: integer
        description: "UBYTE: 1=TCP/IP, 4=RS232"
  - id: get_network_info
    label: GetNetworkInfo
    kind: query
    command: "0x0002"
    description: "Get info on each network interface. Reply contains Number of Interfaces, and per interface Max Message Size + NetworkID + NetworkInfo."
    params:
      - name: serial_number
        type: string
        description: "BLOCK destination serial number"
  - id: request_address
    label: RequestAddress
    kind: action
    command: "0x0004"
    description: "Request use of a specific HiQnet address. Source 0x000000000000, destination broadcast 0xFFFF00000000."
    params:
      - name: hiqnet_device_address
        type: integer
        description: "UWORD requested address"
  - id: address_used
    label: AddressUsed
    kind: action
    command: null
    description: "Notify that a HiQnet address is already in use. The source conflicts: the routing table lists 0x0005, while the AddressUsed message format lists 0x0004. Opcode is unresolved. Destination broadcast 0xFFFF00000000."
    params: []
  - id: set_address
    label: SetAddress
    kind: action
    command: "0x0006"
    description: "Set a specific non-zero HiQnet Device address and network interface info."
    params:
      - name: serial_number
        type: string
        description: "BLOCK 128-bit GUID"
      - name: new_device_address
        type: integer
        description: "UWORD"
      - name: network_id
        type: integer
        description: "UBYTE"
  - id: goodbye
    label: Goodbye
    kind: action
    command: "0x0007"
    description: "Notify receiver that the sender is shutting down; frees peer routing resources without waiting for keep-alive timeout. Not sent on keep-alive timeout."
    params:
      - name: device_address
        type: integer
        description: "UWORD"
  - id: hello_query
    label: Hello (Query)
    kind: action
    command: "0x0008"
    description: "Open a session between two HiQnet devices. FLAGS=0x0020 (Guaranteed). No session header extension yet."
    params:
      - name: session_number
        type: integer
        description: "UWORD non-zero; this device's newly invented session number"
      - name: flag_mask
        type: integer
        description: "UWORD supported header flags; minimum 0x01FF"
  - id: hello_info
    label: Hello (Info)
    kind: action
    command: "0x0008"
    description: "Reply to Hello(Query). FLAGS=0x0124 (Session+Guaranteed+Information). Carries SESSION NUMBER header extension."
    params:
      - name: remote_session_number
        type: integer
        description: "UWORD non-zero; DEST device's session number (echoed from query)"
      - name: local_session_number
        type: integer
        description: "UWORD non-zero; this device's session number"
      - name: flag_mask
        type: integer
        description: "UWORD supported header flags"
  - id: subscribe_event_log
    label: SubscribeEventLog
    kind: action
    command: "0x0115"
    description: "Request event log subscription from a Device Manager VD. Category filter is a ULONG bit-field (1=subscribe, 0=no action); server ORs filters."
    params:
      - name: max_data_size
        type: integer
        description: "UWORD max additional-data size the client will accept"
      - name: category_filter
        type: integer
        description: "ULONG bit-field of categories to subscribe"
  - id: unsubscribe_event_log
    label: UnsubscribeEventLog
    kind: action
    command: "0x012B"
    description: "Cancel event log subscription. Category is ULONG; 1 bit = unsubscribe, 0 = do nothing."
    params:
      - name: category
        type: integer
        description: "ULONG bit-field"
  - id: request_event_log
    label: RequestEventLog
    kind: query
    command: "0x012C"
    description: "Request current event log contents. Reply contains No Of Entries followed by per-entry Category, Event ID, Priority, Sequence Number, Time, Date, Information, Additional Data."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: attribute_value
    type: object
    description: "GetAttributes INFORMATION response. Per AID: UWORD AID, UBYTE data type, N-byte value."
  - id: vd_list_entry
    type: object
    description: "GetVDList INFORMATION response. Workgroup Path, NumVDs, then per VD: UBYTE VDAddress, UWORD VDClassID."
  - id: param_value
    type: object
    description: "MultiParamGet INFORMATION response (0x0103). NumParam then Param_Value entries."
  - id: subscribed_param_update
    type: object
    description: "Unsolicited MultiParamSet (0x0100) or ParamSetPercent (0x0102) pushed when a subscribed parameter changes."
  - id: network_info
    type: object
    description: "GetNetworkInfo INFORMATION response. Number of Interfaces, then per interface Max Message Size + NetworkID + NetworkInfo (MAC, DHCP flag, IP, SubnetMask, Gateway)."
  - id: event_log_entry
    type: object
    description: "RequestEventLog INFORMATION (0x012C) / RequestLogInfo(I) pushed for subscribed events. Per entry: Category, Event ID, Priority (0=Fault/1=Warning/2=Info), Sequence Number, Time, Date, Information, Additional Data."
  - id: protocol_error
    type: object
    description: "HiQnet error header (FLAGS=0x0008) returned for malformed/invalid messages. Contains UWORD error code (Control Network Event IDs 0x0001-0x0011) and STRING error message."
  - id: store_info
    type: object
    description: "Store(info) message indicating a storage location has been modified."
```

## Variables
```yaml
variables: []
```

<!-- UNRESOLVED: Device-specific parameters (channel gain, mute, source/router, presets, DSP objects, meters) for the DCi 2 600N are not enumerated in this generic HiQnet programmer document. Parameter Class IDs, min/max, control laws, and Object/Parameter addresses must be obtained from a Soundweb London / DCi parameter map or via System Architect "Copy HiQnet Information". -->

## Events
```yaml
events: []
```

<!-- UNRESOLVED: device-emitted unsolicited events (other than subscription updates and event-log pushes already covered in Feedbacks) are not enumerated for the DCi 2 600N in this source. -->

## Macros
```yaml
macros: []
```

<!-- UNRESOLVED: no multi-step sequences are explicitly authored for the DCi 2 600N in the source. The closed-loop TCP/IP use case (§4.5.5) describes a recommended session establishment sequence but it is generic guidance, not a device macro. -->

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements are documented in this source. Power amplifier output protection, clip/limiter behaviour, and load-impedance handling are not covered. -->

## Notes
- **Protocol family.** The device is a HiQnet node. All control is via HiQnet binary messages (MESSAGE ID UWORD opcode + typed payload), framed by the HiQnet header (Version 0x02, Header Length, Message Length, Source/Dest HiQnet address, Flags, Hop Count, Sequence Number).
- **Transport.** TCP/IP on IANA port 3804 ("HiQnet-port 3804/tcp Harman HiQnet Port"). UDP 3804 is also defined for open-loop control; not used here. RS232 framing (0xF0 sync, 0x64/0x00 frame start, CCITT-8 checksum, ping/resync) applies only on the serial packet service and is omitted from this TCP spec.
- **Sessions optional.** Third-party controllers may operate session-less; if a Hello(Query) with a session number returns Hello(Error), fall back to session-less communication. A MultiParamGet(NumParams=0) may then be used to start Keep Alives for backward compatibility.
- **Keep Alive.** Default 10000 ms; minimum 250 ms. Guaranteed-service (TCP) keep-alive = DiscoInfo(I) sent KAP ms after last transmitted message; route times out if nothing received within KAP.
- **Parameter discovery.** Per-parameter Class ID, data type, min/max, control law, and flags are retrievable via GetAttributes (Attribute IDs 0-5). Concrete DCi 2 600N Object/Parameter addresses are not in this document.
- **Big-endian.** All multi-byte HiQnet fields are network-byte-ordered (big-endian). Strings are Unicode with a UWORD byte-count prefix including the NULL terminator.

<!-- UNRESOLVED: DCi 2 600N-specific RS232 baud rate (the 57.6 kbps figure in §6.1.1 is stated for dbx HiQnet Devices, not BSS Audio). -->
<!-- UNRESOLVED: voltage, current, and power specifications not in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - audioarchitect.harmanpro.com
  - bssaudio.com
  - crownaudio.com
source_urls:
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-guide.pdf
  - https://bssaudio.com/en/site_elements/drivecore-install-network-manual-english
  - https://audioarchitect.harmanpro.com/resource/audio-architect-hiqnet-third-party-programmers-quick-start-guide.pdf
  - https://www.crownaudio.com/en/softwares/crown-dci-q-sys-plugin-v1-4-1
retrieved_at: 2026-06-30T03:35:22.682Z
last_checked_at: 2026-10-07T12:45:22.492Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:45:22.492Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 action units map to documented HiQnet message IDs and port 3804/tcp is confirmed; the source is a generic HiQnet guide (no DCi model named) and AddressUsed has a documented 0x0004/0x0005 conflict. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic HiQnet programmer doc, not a DCi 2 600N device-specific parameter catalogue. Object IDs, Parameter IDs, and per-channel controls (mute, gain, routing, presets per channel) for the DCi 2 600N are not listed."
- "firmware version compatibility not stated in source"
- "power/voltage/current specifications not in this source"
- "Device-specific parameters (channel gain, mute, source/router, presets, DSP objects, meters) for the DCi 2 600N are not enumerated in this generic HiQnet programmer document. Parameter Class IDs, min/max, control laws, and Object/Parameter addresses must be obtained from a Soundweb London / DCi parameter map or via System Architect \"Copy HiQnet Information\"."
- "device-emitted unsolicited events (other than subscription updates and event-log pushes already covered in Feedbacks) are not enumerated for the DCi 2 600N in this source."
- "no multi-step sequences are explicitly authored for the DCi 2 600N in the source. The closed-loop TCP/IP use case (§4.5.5) describes a recommended session establishment sequence but it is generic guidance, not a device macro."
- "no safety warnings, interlock procedures, or power-on sequencing requirements are documented in this source. Power amplifier output protection, clip/limiter behaviour, and load-impedance handling are not covered."
- "DCi 2 600N-specific RS232 baud rate (the 57.6 kbps figure in §6.1.1 is stated for dbx HiQnet Devices, not BSS Audio)."
- "voltage, current, and power specifications not in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
