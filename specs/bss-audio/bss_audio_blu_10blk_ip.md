---
spec_id: admin/bss-audio-blu-10blk
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio Blu 10Blk Control Spec"
manufacturer: "BSS Audio"
model_family: "Blu 10Blk"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "Blu 10Blk"
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
retrieved_at: 2026-06-30T03:24:48.519Z
last_checked_at: 2026-06-30T06:55:47.265Z
generated_at: 2026-06-30T06:55:47.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - 0x0113
  - "source is generic HiQnet protocol doc, not the Blu 10Blk-specific Soundweb London control document it points to. No device-specific parameter/object table for the Blu 10Blk is present."
  - "device-specific network interface details (MAC/IP/DHCP) not stated for Blu 10Blk."
  - "value shapes are device/object-specific; not enumerated for Blu 10Blk in source"
  - "device-specific parameter catalog (object/param IDs, ranges) not present in source."
  - "device-specific (0x8000-0xFFFF) custom event IDs for Blu 10Blk not in source."
  - "no device-specific macros documented."
  - "no safety/interlock material present in source."
  - "device-specific object/parameter IDs, preset/scene counts, and Blu 10Blk capabilities not in this generic source."
  - "firmware version compatibility range not stated."
  - "ParameterUnSubscribeAll MSG_ID 0x0114 duplicates SubscribeAll in source — likely typo, unverified."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:55:47.265Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched their documented MESSAGE IDs verbatim in the source; transport port 3804 confirmed; only 0x0113 (subscribe feedback response) is extra in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio Blu 10Blk Control Spec

## Summary
HiQnet third-party programmer protocol spec applied to the BSS Audio Blu 10Blk. Control via TCP/IP (HiQnet port 3804) and optionally UDP datagram; transport-agnostic binary message protocol with message-ID-addressed methods. Note: source is the generic HiQnet Third Party Programmer Documentation (Rev 2.2, Feb 2013) which states BSS Soundweb London devices should instead refer to the dedicated "BSS Soundweb London Third Party Control Document" — this spec is therefore a generic HiQnet mapping and may miss device-specific Blu commands.

<!-- UNRESOLVED: source is generic HiQnet protocol doc, not the Blu 10Blk-specific Soundweb London control document it points to. No device-specific parameter/object table for the Blu 10Blk is present. -->

## Transport
```yaml
protocols:
  - tcp
  - udp  # source documents a UDP datagram packet service alongside TCP (port 3804/udp)
addressing:
  port: 3804  # IANA "HiQnet-port 3804/tcp Harman HiQnet Port" and "3804/udp", stated in source
auth:
  type: none  # inferred: no login/password/auth procedure described in source (sessions are optional for 3rd-party control)
# Protocol version: 0x02 (HiQnet revision 2.0). Multi-byte types are Big Endian.
# For TCP/IP connections no frame-start/frame-count/checksum/PING/ACK/resync bytes are used
# (those apply only to the RS232 packet service). Source: section 6 "IP Connections" + Appendix.
# UNRESOLVED: device-specific network interface details (MAC/IP/DHCP) not stated for Blu 10Blk.
```

## Traits
```yaml
traits:
  - queryable   # inferred: MultiParamGet / GetAttributes / GetVDList query methods documented
  - levelable   # inferred: ParamSetPercent + parameter min/max/control-law model documented
  # No explicit power on/off routing/source-select commands appear at the device level in this
  # generic protocol doc; powerable/routable not inferred here.
```

## Actions
```yaml
# HiQnet Message-ID catalog documented in the source. Each entry carries its verbatim
# MESSAGE ID (UWORD). Payloads are binary; TCP/IP transport omits RS232 framing bytes.
# Parameter addresses are device/object-specific (HiQnet 48-bit address: Device.VD.Object.Param)
# and are NOT documented for the Blu 10Blk in this generic source → UNRESOLVED per action.

# --- Routing Layer messages (section 4.3) ---
- id: disco_info
  label: DiscoInfo
  kind: action
  command: "MESSAGE_ID 0x0000"  # locate devices + exchange routing info (Query/Info forms)
  params:
    - name: hiqnet_device
      type: integer
      description: UWORD device address of sender
    - name: network_id
      type: integer
      description: "UBYTE network type (1 = TCP/IP, 4 = RS232)"

- id: get_network_info
  label: GetNetworkInfo
  kind: query
  command: "MESSAGE_ID 0x0002"
  params: []

- id: request_address
  label: RequestAddress
  kind: action
  command: "MESSAGE_ID 0x0004"  # request use of a specific HiQnet address
  params:
    - name: hiqnet_device_address
      type: integer
      description: UWORD requested address

- id: address_used
  label: AddressUsed
  kind: action
  command: "MESSAGE_ID 0x0005"  # notify an address is in use
  params: []

- id: set_address
  label: SetAddress
  kind: action
  command: "MESSAGE_ID 0x0006"  # set HiQnet + network address
  params:
    - name: serial_number
      type: string
      description: BLOCK 128-bit GUID
    - name: new_device_address
      type: integer
      description: UWORD new HiQnet address

- id: goodbye
  label: Goodbye
  kind: action
  command: "MESSAGE_ID 0x0007"  # notify sender is shutting down; cancels all subscriptions
  params:
    - name: device_address
      type: integer
      description: UWORD device address

- id: hello
  label: Hello (Query / Info)
  kind: action
  command: "MESSAGE_ID 0x0008"  # open a session; FLAGS 0x0020 (guaranteed) required
  params:
    - name: session_number
      type: integer
      description: UWORD non-zero session number
    - name: flag_mask
      type: integer
      description: UWORD supported header flags (min 0x01FF)

# --- Parameter messages (section 3.6 - 3.12) ---
- id: multi_param_set
  label: MultiParamSet
  kind: action
  command: "MESSAGE_ID 0x0100"  # set NumParam parameter values within an object/VD
  params:
    - name: num_param
      type: integer
      description: UWORD count of parameters
    - name: entries
      type: string
      description: repeated Param_ID + data-type + value triples

- id: multi_object_param_set
  label: MultiObjectParamSet
  kind: action
  command: "MESSAGE_ID 0x0101"  # parameter values from multiple objects (subscription push)
  params:
    - name: num_objects
      type: integer
      description: UWORD object count

- id: param_set_percent
  label: ParamSetPercent
  kind: action
  command: "MESSAGE_ID 0x0102"  # set param via 1.15 signed fixed-point percentage (UWORD)
  params:
    - name: num_param
      type: integer
      description: UWORD count
    - name: param_value
      type: integer
      description: UWORD 1.15 fixed point (0x8000=-100%, 0x7FFF≈+100%)

- id: multi_param_get
  label: MultiParamGet
  kind: query
  command: "MESSAGE_ID 0x0103"  # get NumParam parameter values
  params:
    - name: num_param
      type: integer
      description: UWORD count

- id: multi_param_subscribe
  label: MultiParamSubscribe
  kind: action
  command: "MESSAGE_ID 0x010F"  # subscribe to param changes
  params:
    - name: sensor_rate
      type: integer
      description: UWORD period in ms (fastest sensor update)

- id: param_subscribe_percent
  label: ParamSubscribePercent
  kind: action
  command: "MESSAGE_ID 0x0111"  # percentage-based subscription
  params:
    - name: sensor_rate
      type: integer
      description: UWORD period in ms

- id: multi_param_unsubscribe
  label: MultiParamUnsubscribe
  kind: action
  command: "MESSAGE_ID 0x0112"
  params:
    - name: number_of_subscriptions
      type: integer
      description: UWORD count

- id: parameter_subscribe_all
  label: ParameterSubscribeAll
  kind: action
  command: "MESSAGE_ID 0x0114"  # subscribe to every SV under an object/VD
  params:
    - name: subscription_type
      type: integer
      description: "UBYTE 0=ALL, 1=Non-Sensor, 2=Sensor"

- id: parameter_unsubscribe_all
  label: ParameterUnSubscribeAll
  kind: action
  command: "MESSAGE_ID 0x0114"  # source lists MSG_ID 0x0114 for unsubscribe-all (verbatim); may be a doc typo
  params:
    - name: subscription_type
      type: integer
      description: "UBYTE 0=ALL, 1=Non-Sensor, 2=Sensor"

# --- Event Log messages (section 3.4) ---
- id: subscribe_event_log
  label: SubscribeEventLog
  kind: action
  command: "MESSAGE_ID 0x0115"
  params:
    - name: max_data_size
      type: integer
      description: UWORD max additional-data size
    - name: category_filter
      type: integer
      description: ULONG bitmask of categories

- id: unsubscribe_event_log
  label: UnsubscribeEventLog
  kind: action
  command: "MESSAGE_ID 0x012B"
  params:
    - name: category
      type: integer
      description: ULONG bitmask of categories to unsubscribe

- id: request_event_log
  label: RequestEventLog
  kind: query
  command: "MESSAGE_ID 0x012C"
  params: []

# --- Device level methods (section 3.3) ---
- id: get_attributes
  label: GetAttributes
  kind: query
  command: "MESSAGE_ID 0x010D"  # get n attribute values from object/VD
  params:
    - name: no_of_attributes
      type: integer
      description: UWORD count
    - name: aids
      type: integer
      description: repeated UWORD attribute IDs

- id: get_vd_list
  label: GetVDList
  kind: query
  command: "MESSAGE_ID 0x011A"  # list virtual devices in a device
  params:
    - name: workgroup_path
      type: string
      description: workgroup asked to respond

- id: store
  label: Store
  kind: action
  command: "MESSAGE_ID 0x0124"  # store performance data to non-volatile storage
  params:
    - name: store_action
      type: integer
      description: "UBYTE 0=Params,1=Subs,2=Scenes,3=Snapshots,4=Presets,5=Venue"
    - name: store_number
      type: integer
      description: UWORD local storage slot

- id: recall
  label: Recall
  kind: action
  command: "MESSAGE_ID 0x0125"  # recall performance data (scene/preset/venue)
  params:
    - name: recall_action
      type: integer
      description: "UBYTE 0=Params,1=Subs,2=Scenes,3=Snapshots,4=Presets,5=Venue"
    - name: recall_number
      type: integer
      description: UWORD scene/preset/venue number

- id: locate
  label: Locate
  kind: action
  command: "MESSAGE_ID 0x0129"  # flash locate LEDs (2Hz); compulsory for Device Manager VD
  params:
    - name: time
      type: integer
      description: "UWORD ms; 0x0000=off, 0xFFFF=on, 0x0001-0xFFFE=flash period"
```

## Feedbacks
```yaml
# Query responses use the same MESSAGE_ID with the Information flag set in the header.
- id: multi_param_get_info
  type: block
  description: "MultiParamGet response (MESSAGE_ID 0x0103, Info flag): NumParam + Param_Value list"
  # UNRESOLVED: value shapes are device/object-specific; not enumerated for Blu 10Blk in source

- id: get_attributes_info
  type: block
  description: "GetAttributes response (0x010D, Info): AID + data-type + value triples"

- id: get_vd_list_info
  type: block
  description: "GetVDList response (0x011A, Info): WorkgroupPath + NumVDs + VD entries"

- id: request_event_log_info
  type: block
  description: "RequestEventLog response (0x012C, Info): event entries (category/event-id/priority/time/date)"
  values:
    - fault      # priority 0
    - warning    # priority 1
    - information # priority 2

- id: param_change_push
  type: block
  description: "Unsolicited MultiParamSet (0x0100) / MultiObjectParamSet (0x0101) pushes from subscribed parameter changes"
```

## Variables
```yaml
# HiQnet parameters are addressed via 48-bit HiQnet address (Device.VD.Object.ParamIndex)
# with per-parameter min/max/control-law/flags attributes retrieved via GetAttributes.
# Actual variable set for Blu 10Blk is NOT documented in this generic source.
# UNRESOLVED: device-specific parameter catalog (object/param IDs, ranges) not present in source.
```

## Events
```yaml
# Event Log: each device has an event log; subscribed events arrive via RequestEventLog(Info).
# Categories (section 3.4.1.1): 0 Unassigned,1 Application,2 Configuration,3 Audio Network,
# 4 Control Network,5 Vendor Network,6 Startup,7 DSP,8 Misc,9 Control Logic,
# 10 Foreign Protocol,11 Digital I/O,14 Control Surface.
# Control-Network protocol errors (section 3.4.1.3) are ALWAYS returned to sender regardless
# of subscription: 0x0001 InvalidVersion ... 0x0011 NotARouter (see source for full table).
# UNRESOLVED: device-specific (0x8000-0xFFFF) custom event IDs for Blu 10Blk not in source.
```

## Macros
```yaml
# No multi-step sequences explicitly authored in source. Closed-loop TCP/IP control use case
# (section 4.5.5) documents an 8-step DiscoQuery→DiscoInfo→Hello→Subscribe→ParamSet flow;
# treated as a connection-establishment procedure, not an authored macro.
# UNRESOLVED: no device-specific macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no safety warnings, interlock procedures, or power-on sequencing for the
# Blu 10Blk. Only note: a Goodbye cancels all subscriptions; resync (RS232) drops connection.
# UNRESOLVED: no safety/interlock material present in source.
```

## Notes
- Source is generic HiQnet Third Party Programmer Documentation (Rev 2.2, 19 Feb 2013), not Blu 10Blk-specific. Section 1 explicitly redirects Soundweb London devices to the separate "BSS Soundweb London Third Party Control Document."
- TCP/IP framing: NO frame-start (0x64), frame-count, CCITT checksum, PING (0xF0 0x8C), RESYNC (0xFF/0xF0), or ACK (0xA5) bytes — those belong only to the RS232 packet service. TCP/IP relies on TCP/UDP link-layer reliability.
- Port 3804 registered with IANA for both tcp and udp.
- Big Endian byte order for all multi-byte types.
- Sessions are OPTIONAL for third-party control (section 7).
- HiQnet addresses: 16-bit Device + 8-bit VD + 24-bit Object + 16-bit ParamIndex.
- Recall example (Device Preset 1) verbatim from source section 6.3:
  `0xF0 0x64 0x00 0x02 0x19 0x00 0x00 0x00 0x21 0x00 0x33 0x00 0x00 0x00 0x00 0x00 0x20 0x00 0x00 0x00 0x00 0x01 0x25 0x00 0x20 0x05 0x00 0x00 0x03 0x00 0x01 0x00 0x02 0x00 0x00 0x00 0x01 (checksum byte)` — note this is RS232-framed; TCP/IP omits leading 0xF0/0x64/0x00 frame bytes and trailing checksum.

<!-- UNRESOLVED: device-specific object/parameter IDs, preset/scene counts, and Blu 10Blk capabilities not in this generic source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: ParameterUnSubscribeAll MSG_ID 0x0114 duplicates SubscribeAll in source — likely typo, unverified. -->

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
retrieved_at: 2026-06-30T03:24:48.519Z
last_checked_at: 2026-06-30T06:55:47.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:55:47.265Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched their documented MESSAGE IDs verbatim in the source; transport port 3804 confirmed; only 0x0113 (subscribe feedback response) is extra in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- 0x0113
- "source is generic HiQnet protocol doc, not the Blu 10Blk-specific Soundweb London control document it points to. No device-specific parameter/object table for the Blu 10Blk is present."
- "device-specific network interface details (MAC/IP/DHCP) not stated for Blu 10Blk."
- "value shapes are device/object-specific; not enumerated for Blu 10Blk in source"
- "device-specific parameter catalog (object/param IDs, ranges) not present in source."
- "device-specific (0x8000-0xFFFF) custom event IDs for Blu 10Blk not in source."
- "no device-specific macros documented."
- "no safety/interlock material present in source."
- "device-specific object/parameter IDs, preset/scene counts, and Blu 10Blk capabilities not in this generic source."
- "firmware version compatibility range not stated."
- "ParameterUnSubscribeAll MSG_ID 0x0114 duplicates SubscribeAll in source — likely typo, unverified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
