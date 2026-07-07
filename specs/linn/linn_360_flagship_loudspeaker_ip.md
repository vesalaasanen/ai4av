---
spec_id: admin/linn-360-flagship-loudspeaker
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn 360 Flagship Loudspeaker Control Spec"
manufacturer: Linn
model_family: "Linn 360 Flagship loudspeaker"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn 360 Flagship loudspeaker"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
  - https://docs.linn.co.uk/wiki/index.php/Linn_DS/DSM_control
  - https://docs.linn.co.uk/wiki/index.php/RS232
retrieved_at: 2026-06-30T10:57:14.429Z
last_checked_at: 2026-07-07T11:46:02.599Z
generated_at: 2026-07-07T11:46:02.599Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source is the general Linn LPEC Protocol Reference. It does not document 360-specific services/actions; the concrete service/action set for the 360 is device-dependent and is normally discovered via UPnP (device.xml / service.xml). Firmware/protocol version ranges, power specs, and the full 360 action catalogue are not stated."
  - "no baud/serial config applicable (TCP only). No keepalive/heartbeat spec."
  - "full set of evented variables per service not enumerated in source (discover via UPnP service.xml)."
  - "device exposes additional settable variables via UPnP services"
  - "populate from source if a 360-specific macro section exists elsewhere."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:46:02.599Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions matched verbatim in source; complete bidirectional coverage of LPEC command set and transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Linn 360 Flagship Loudspeaker Control Spec

## Summary
Network control spec for the Linn 360 flagship loudspeaker over the Linn LPEC (Linn Private Ethernet Control) protocol. LPEC is a text protocol carried over a raw TCP socket session on port 23, exposing UPnP-style services (Product, Preamp, MediaRenderer/AVTransport, MediaRenderer/RenderingControl, Pins) via `ACTION`, `SUBSCRIBE`, and `UNSUBSCRIBE` messages with `RESPONSE`/`EVENT` replies.

<!-- UNRESOLVED: Source is the general Linn LPEC Protocol Reference. It does not document 360-specific services/actions; the concrete service/action set for the 360 is device-dependent and is normally discovered via UPnP (device.xml / service.xml). Firmware/protocol version ranges, power specs, and the full 360 action catalogue are not stated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # raw socket session (LPEC uses TCP port 23 but is NOT RFC telnet)
auth:
  type: none  # inferred: no auth procedure in source
# Session limits stated in source:
#   - max 4 simultaneous LPEC sessions; sessions 5+ are ignored
#   - each product supports only one concurrent LPEC session (see Other Considerations - note conflicts with the 4-session statement; left as documented)
# UNRESOLVED: no baud/serial config applicable (TCP only). No keepalive/heartbeat spec.
```

## Traits
```yaml
traits:
  - queryable   # inferred: GetVolume, Volume, Source, GetIdArray query examples in source
  - routable    # inferred: SetSourceIndex / SetSourceBySystemName / SetSourceIndexByName source-selection examples
  - levelable   # inferred: SetVolume volume-control example
  # powerable NOT added: source shows ProductStandby only as an evented variable; no explicit standby/power ACTION is documented.
```

## Actions
```yaml
# Source documents LPEC by example, not as an exhaustive command catalogue.
# "LPEC does not implement a service discovery protocol. The specific set of
# services and actions implemented on each device is dependent on the device
# type." The entries below are the distinct ACTION/operation examples the
# source documents verbatim. The 360's full action set must be discovered via
# UPnP (device.xml -> service.xml) and mapped onto LPEC ACTIONs.
actions:
  # --- RenderingControl (MediaRenderer) ---
  - id: set_volume
    label: Set Volume
    kind: action
    service: MediaRenderer/RenderingControl
    command: 'ACTION MediaRenderer/RenderingControl 1 SetVolume "0" "Master" "50"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'
      - name: channel
        type: string
        description: 'Channel name (source uses "Master")'
      - name: volume
        type: integer
        description: Volume level (0-100 range typical; exact range UNRESOLVED - not stated in source)
    notes: Source example sets volume to 50. No output args.

  - id: get_volume
    label: Get Volume
    kind: query
    service: MediaRenderer/RenderingControl
    command: 'ACTION MediaRenderer/RenderingControl 1 GetVolume "0" "Master"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'
      - name: channel
        type: string
        description: 'Channel name (source uses "Master")'
    notes: Returns RESPONSE "<volume>".

  # --- AVTransport (MediaRenderer) ---
  - id: play
    label: Play
    kind: action
    service: MediaRenderer/AVTransport
    command: 'ACTION MediaRenderer/AVTransport 1 Play "0" "1"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'
      - name: speed
        type: string
        description: 'Play speed (source uses "1")'

  - id: pause
    label: Pause
    kind: action
    service: MediaRenderer/AVTransport
    command: 'ACTION MediaRenderer/AVTransport 1 Pause "0"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'

  - id: next
    label: Next Track
    kind: action
    service: MediaRenderer/AVTransport
    command: 'ACTION MediaRenderer/AVTransport 1 Next "0"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'

  - id: previous
    label: Previous Track
    kind: action
    service: MediaRenderer/AVTransport
    command: 'ACTION MediaRenderer/AVTransport 1 Previous "0"'
    params:
      - name: instance
        type: string
        description: 'Instance ID (source uses "0")'

  # --- Preamp ---
  - id: volume_query
    label: Preamp Volume Query
    kind: query
    service: Preamp/Preamp
    command: 'ACTION Preamp/Preamp 1 Volume'
    params: []
    notes: Returns RESPONSE "<volume>" (source example RESPONSE "40").

  - id: set_mute
    label: Set Mute
    kind: action
    service: Preamp/Preamp
    command: 'ACTION Preamp/Preamp 1 SetMute "true"'
    params:
      - name: mute
        type: boolean
        description: '"true" to mute, "false" to unmute (XML-escaped, quoted)'
    notes: No output args (empty RESPONSE).

  # --- Product (source selection) ---
  - id: set_source_index
    label: Set Source By Index
    kind: action
    service: Ds/Product
    command: 'ACTION Ds/Product 1 SetSourceIndex "0"'
    params:
      - name: index
        type: integer
        description: 'Source index (source: "Index numbers are not guaranteed and may change with different versions of Linn firmware or if sources are disabled"). Prefer SetSourceBySystemName.'
    notes: Version 1. Indices are NOT stable across firmware/invisibility changes.

  - id: set_source_by_systemname
    label: Set Source By System Name
    kind: action
    service: Ds/Product
    command: 'ACTION Ds/Product 2 SetSourceBySystemName "Balanced"'
    params:
      - name: system_name
        type: string
        description: 'System name (always fixed): e.g. Playlist, Radio, Songcast, NetAux, UpnpAv, Analog1, Phono, Balanced, Front Aux, HDMI1, SPDIF1, TOSLINK1'
    notes: Version 2. System names are "always fixed" per source table.

  - id: set_source_index_by_name
    label: Set Source By Name (Konfig)
    kind: action
    service: Ds/Product
    command: 'ACTION Ds/Product 2 SetSourceIndexByName "CD12"'
    params:
      - name: name
        type: string
        description: 'Konfig-adjusted input name (examples: Playlist, Radio, Airplay, UpnpAv, Analog1, LP12, CD12, iPod, SKY, DAT Player, CD Player)'
    notes: Version 2. Name adjusted by Konfig input name.

  - id: source_query
    label: Source Info Query
    kind: query
    service: Ds/Product
    command: 'ACTION Ds/Product 2 Source "9"'
    params:
      - name: index
        type: integer
        description: Source index to look up
    notes: Returns SourceIndex, Systemname, and ByName for the given index.

  # --- Pins ---
  - id: pins_invoke_id
    label: Invoke PIN
    kind: action
    service: Ds/Pins
    command: 'ACTION Ds/Pins 1 InvokeId "1"'
    params:
      - name: pin_id
        type: integer
        description: 'PIN id (NOT guaranteed; may change after reboot if recently altered)'
    notes: Requires Davaar 67+.

  - id: pins_read_list
    label: Read PIN List
    kind: query
    service: Ds/Pins
    command: 'ACTION Ds/Pins 1 ReadList "[ 1]"'
    params:
      - name: json_array
        type: string
        description: 'JSON-style array of PIN ids (source example "[ 1]")'

  - id: pins_get_id_array
    label: Get PIN Id Array
    kind: query
    service: Ds/Pins
    command: 'ACTION Ds/Pins 1 GetIdArray'
    params: []
    notes: Returns the live PIN id array.

  # --- Protocol primitives (documented command forms) ---
  - id: subscribe
    label: Subscribe To Service Events
    kind: action
    command: 'SUBSCRIBE [sub-device]/[service]'
    params:
      - name: service_path
        type: string
        description: 'e.g. Ds/Product, MediaRenderer/AVTransport'
    notes: Device replies SUBSCRIBE <subscription-id> then sends an initial EVENT with current state. Max 16 subscriptions per session.

  - id: unsubscribe_id
    label: Unsubscribe By Subscription Id
    kind: action
    command: 'UNSUBSCRIBE [subscription-id]'
    params:
      - name: subscription_id
        type: integer
        description: Subscription id returned by SUBSCRIBE

  - id: unsubscribe_service
    label: Unsubscribe By Service Path
    kind: action
    command: 'UNSUBSCRIBE [sub-device]/[service]'
    params:
      - name: service_path
        type: string
        description: 'e.g. Ds/Product'

  - id: unsubscribe_all
    label: Unsubscribe All
    kind: action
    command: 'UNSUBSCRIBE'
    params: []
    notes: Multiple UNSUBSCRIBE responses may be received (one per active subscription).
```

## Feedbacks
```yaml
# Observable state arrives via RESPONSE (synchronous, to an ACTION query) and
# EVENT (unsolicited, for evented variables). Documented evented variables and
# response shapes from source examples:
feedbacks:
  - id: action_response
    type: string
    description: 'RESPONSE "<outarg1>" "<outarg2>" ... - output args of the invoked ACTION (empty RESPONSE when no output args). All args XML-escaped and double-quoted.'

  - id: product_name
    type: string
    description: 'Evented Product service variable. Example value "Sneaky Music DS".'

  - id: product_room
    type: string
    description: 'Evented Product service variable. Example value "Main Room".'

  - id: product_standby
    type: boolean
    description: 'Evented Product service variable (standby state). Example "true".'
    values: ["true", "false"]

  - id: product_source_index
    type: integer
    description: 'Evented Product service variable (currently selected source index).'

  - id: volume
    type: integer
    description: 'Returned by GetVolume / Preamp Volume query. Source example RESPONSE "40".'
# UNRESOLVED: full set of evented variables per service not enumerated in source (discover via UPnP service.xml).
```

## Variables
```yaml
# All settable parameters in source appear as discrete ACTIONs (SetVolume,
# SetMute, SetSource*). No separate parameter-table variables documented.
# UNRESOLVED: device exposes additional settable variables via UPnP services
# not enumerated in this source.
```

## Events
```yaml
# Unsolicited notifications the device sends (all <CR><LF> terminated):
events:
  - id: event_state_change
    type: event
    command: 'EVENT [subscription-id] [sequence-no] [var1-name] "[var1]" [var2-name] "[var2]" ... [varn-name] "[varn]"'
    description: 'Sent on subscription (sequence-no 0 = initial full state) and on subsequent variable changes (sequence-no increments, 32-bit unsigned, wraps to 1). Only changed variables are reported.'

  - id: alive
    type: event
    command: 'ALIVE [sub-device] [udn]'
    description: 'Sent on connect for each enabled sub-device, and when a sub-device is (re)enabled. Example: ALIVE Ds 4c494e4e-0050-c221-71e5-df000003013f'

  - id: byebye
    type: event
    command: 'BYEBYE [sub-device] [udn]'
    description: 'Sent when a sub-device is disabled. Commonly preceded by unsolicited UNSUBSCRIBE messages (subscriptions forcibly revoked). Sent for all sub-devices before the device closes the LPEC connection on reboot.'

  - id: error
    type: event
    command: 'ERROR [code] "[description]"'
    description: 'Error reply to an ACTION/SUBSCRIBE/UNSUBSCRIBE. Defined codes: 101 Command not recognised; 102 Service not specified; 103 Service not found; 104 Version invalid; 105 Version not specified; 106 Version not supported; 107 Method not specified; 108 Method execution exception; 201 Boolean argument invalid; 202 String argument invalid; 203 Unsigned numeric argument invalid; 204 Signed numeric invalid; 205 Binary argument invalid; 206 Invalid argument escaping; 301 Argument list incomplete; 302 Argument not quoted; 303 Argument incomplete; 401 Already subscribed; 402 Client has too many subscriptions; 403 Service has too many subscriptions; 404 Subscription not found; 405 Service not subscribed; 406 Invalid XML escaping. Service-specific ERROR messages may also be sent.'

  - id: subscribe_ack
    type: event
    command: 'SUBSCRIBE [subscription-id]'
    description: 'Acknowledgement of a SUBSCRIBE; carries the assigned subscription id.'

  - id: unsubscribe_ack
    type: event
    command: 'UNSUBSCRIBE [subscription-id]'
    description: 'Acknowledgement of an UNSUBSCRIBE. For unsubscribe-all, one ack per active subscription may arrive.'
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: populate from source if a 360-specific macro section exists elsewhere.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- **Transport nuance:** LPEC uses TCP port 23 but is a *raw socket* session, not RFC 854 telnet. Do not negotiate telnet options.
- **Session limits:** Source states both "up to 4 simultaneous sessions" (Connection section) and "each product supports only one concurrent LPEC session" (Other Considerations). This contradiction is left as-documented — verify against the target 360 device.
- **Connection hygiene:** Source recommends control devices close the TELNET/LPEC connection when the touchpanel is asleep (Crestron processors are known to re-open ports without closing existing ones).
- **Known bug:** The first command sent immediately after the initial ALIVE messages generates a spurious ERROR. Workaround: send a blank/no-op command right after ALIVEs to absorb the error, then proceed normally.
- **Argument encoding:** All input/output arguments are XML-escaped and enclosed in double-quotes.
- **Subscription limits:** Up to 16 services may be subscribed simultaneously per session. Subscriptions are auto-cleaned when the control point closes the session, and forcibly revoked on sub-device disable (BYEBYE).
- **Source indices are unstable:** `SetSourceIndex` numeric indices can change with firmware version or when sources are made invisible (Davaar 50+). Prefer `SetSourceBySystemName` (always-fixed system names).
- **PIN ids are unstable:** PIN ids can change after a reboot if recently altered. Requires Davaar 67+.
- **Service discovery:** LPEC has no built-in service discovery. Discover available services/actions via UPnP (`http://<ip>:<port>/<device>/device.xml` → `service.xml`) and map onto LPEC ACTIONs. Example device URL form: `http://192.168.0.123:55178/Ds/device.xml`.

<!-- UNRESOLVED: -->
<!-- - 360-specific service/action catalogue not in source (general LPEC ref only). -->
<!-- - Volume range (0–100?) not stated. -->
<!-- - Firmware version compatibility ranges not stated (only Davaar 50+ / 67+ hints for specific features). -->
<!-- - LPEC protocol version number not stated. -->
<!-- - Power-on/off or standby ACTION command not documented (only ProductStandby evented state). -->
<!-- - One-session vs four-session contradiction not resolved by source. -->
```

---

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
  - https://docs.linn.co.uk/wiki/index.php/Linn_DS/DSM_control
  - https://docs.linn.co.uk/wiki/index.php/RS232
retrieved_at: 2026-06-30T10:57:14.429Z
last_checked_at: 2026-07-07T11:46:02.599Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:46:02.599Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions matched verbatim in source; complete bidirectional coverage of LPEC command set and transport parameters. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source is the general Linn LPEC Protocol Reference. It does not document 360-specific services/actions; the concrete service/action set for the 360 is device-dependent and is normally discovered via UPnP (device.xml / service.xml). Firmware/protocol version ranges, power specs, and the full 360 action catalogue are not stated."
- "no baud/serial config applicable (TCP only). No keepalive/heartbeat spec."
- "full set of evented variables per service not enumerated in source (discover via UPnP service.xml)."
- "device exposes additional settable variables via UPnP services"
- "populate from source if a 360-specific macro section exists elsewhere."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
