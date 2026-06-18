---
spec_id: admin/linn-spotify
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Spotify Control Spec"
manufacturer: Linn
model_family: "Linn Spotify"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Linn Spotify"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
  - https://docs.linn.co.uk/wiki/index.php/Spotify
retrieved_at: 2026-06-15T12:42:04.183Z
last_checked_at: 2026-06-16T07:08:33.975Z
generated_at: 2026-06-16T07:08:33.975Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific variants (DS vs DSI vs DSM) not enumerated in source; only generic LPEC protocol documented."
  - "exact Spotify-source actions not separately listed; source documents generic DS service actions."
  - "firmware version compatibility ranges only partly stated (Davaar 50+ for source indexing by name, Davaar 67+ for PIN invoke)."
  - "full set of settable parameters not exhaustively enumerated; LPEC exposes"
  - "no multi-step sequences explicitly described in source. Populate if"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "model-specific compatible_with.models — source is generic LPEC for the DS family (example device \"Sneaky Music DS\"); exact Spotify-source model identifier not stated."
  - "complete UPnP service/action catalogue not enumerated in source (only representative examples given); full set is device-dependent and discoverable via UPnP."
  - "voltage/current/power specifications — out of scope for protocol doc, not stated."
  - "protocol version number of LPEC itself — not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:08:33.975Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions have literal matches in the LPEC protocol source; all transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Linn Spotify Control Spec

## Summary
Linn Spotify is a network media player controlled via the Linn LPEC (Linn Protocol for External Control) over a raw TCP socket session on port 23. The protocol exposes UPnP-style service actions (AVTransport, RenderingControl, Preamp, Product, Pins) plus subscribe/event messaging for asynchronous state updates. This spec covers the LPEC protocol as documented for the Linn DS family, applicable to the Spotify source on Linn DS/DSI/DSM products.

<!-- UNRESOLVED: model-specific variants (DS vs DSI vs DSM) not enumerated in source; only generic LPEC protocol documented. -->
<!-- UNRESOLVED: exact Spotify-source actions not separately listed; source documents generic DS service actions. -->
<!-- UNRESOLVED: firmware version compatibility ranges only partly stated (Davaar 50+ for source indexing by name, Davaar 67+ for PIN invoke). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # raw socket session (documented as "raw socket session to port 23")
auth:
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: Volume?, Source?, GetVolume, GetIdArray query examples
  - routable   # inferred: SetSourceIndex / SetSourceBySystemName / SetSourceIndexByName source-selection commands
```

## Actions
```yaml
# LPEC device service actions documented in the source. Each action is sent as:
#   ACTION [sub-device]/[service] [version] [action] "[inarg1]" ...
# and acknowledged with a RESPONSE message.

# --- AVTransport: transport state ---
- id: avtransport_play
  label: Play
  kind: action
  command: 'ACTION MediaRenderer/AVTransport 1 Play "0" "1"'
  params:
    - name: instance
      type: string
      description: AVTransport instance ID (source uses "0")
    - name: speed
      type: string
      description: Play speed (source uses "1")
  notes: Source example: ACTION MediaRenderer/AVTransport 1 Play "0" "1"

- id: avtransport_pause
  label: Pause
  kind: action
  command: 'ACTION MediaRenderer/AVTransport 1 Pause "0"'
  params:
    - name: instance
      type: string
      description: AVTransport instance ID (source uses "0")

- id: avtransport_next
  label: Next Track
  kind: action
  command: 'ACTION MediaRenderer/AVTransport 1 Next "0"'
  params:
    - name: instance
      type: string
      description: AVTransport instance ID (source uses "0")

- id: avtransport_previous
  label: Previous Track
  kind: action
  command: 'ACTION MediaRenderer/AVTransport 1 Previous "0"'
  params:
    - name: instance
      type: string
      description: AVTransport instance ID (source uses "0")

# --- RenderingControl: volume ---
- id: renderingcontrol_set_volume
  label: Set Volume
  kind: action
  command: 'ACTION MediaRenderer/RenderingControl 1 SetVolume "0" "Master" "50"'
  params:
    - name: instance
      type: string
      description: RenderingControl instance ID (source uses "0")
    - name: channel
      type: string
      description: Channel name (source uses "Master")
    - name: volume
      type: integer
      description: Volume level (source example "50")
  notes: No output arguments; RESPONSE is an empty <CR><LF>-terminated message.

- id: renderingcontrol_get_volume
  label: Get Volume
  kind: query
  command: 'ACTION MediaRenderer/RenderingControl 1 GetVolume "0" "Master"'
  params:
    - name: instance
      type: string
      description: RenderingControl instance ID (source uses "0")
    - name: channel
      type: string
      description: Channel name (source uses "Master")
  notes: Returns RESPONSE "<volume>".

# --- Preamp service ---
- id: preamp_volume_query
  label: Preamp Volume Query
  kind: query
  command: 'ACTION Preamp/Preamp 1 Volume'
  params: []
  notes: Returns RESPONSE "<volume>" (source example RESPONSE "40").

- id: preamp_set_mute
  label: Set Mute
  kind: action
  command: 'ACTION Preamp/Preamp 1 SetMute "true"'
  params:
    - name: mute
      type: boolean
      description: Mute state; XML-escaped boolean ("true"/"false")
  notes: Empty RESPONSE on success.

# --- Product service: source selection (v1 by index) ---
- id: product_set_source_index
  label: Set Source By Index (v1)
  kind: action
  command: 'ACTION Ds/Product 1 SetSourceIndex "0"'
  params:
    - name: source_index
      type: integer
      description: |
        Numeric source index. NOT guaranteed stable across firmware/Konfig changes
        (Davaar 50+ invisibility changes indices). Prefer v2 by-name actions.
  notes: Source table maps index → SystemName (0=Playlist,1=Radio,2=Songcast,3=NetAux,4=UpnpAv).

# --- Product service: source selection (v2 by name) ---
- id: product_set_source_by_systemname
  label: Set Source By System Name (v2)
  kind: action
  command: 'ACTION Ds/Product 2 SetSourceBySystemName "Balanced"'
  params:
    - name: system_name
      type: string
      description: |
        System name of the source. Always-fixed (case-sensitive) values from source:
        Playlist, Radio, Songcast, NetAux, UpnpAv, Analog1, Phono, Balanced,
        Front Aux, HDMI1, SPDIF1, TOSLINK1.
  notes: v2 requires Davaar 50+ firmware.

- id: product_set_source_index_by_name
  label: Set Source Index By Name (v2)
  kind: action
  command: 'ACTION Ds/Product 2 SetSourceIndexByName "CD12"'
  params:
    - name: by_name
      type: string
      description: |
        User-adjustable "ByName" label (set via Konfig). Examples from source:
        Playlist, Radio, Songcast, Airplay, UpnpAv, Analog1, LP12, CD12, iPod,
        SKY, DAT Player, CD Player.
  notes: ByName labels are user-customised via Konfig; not guaranteed identical across installs.

- id: product_source_query
  label: Source Info Query (v2)
  kind: query
  command: 'ACTION Ds/Product 2 Source "9"'
  params:
    - name: source_index
      type: integer
      description: Index to inspect (source example "9")
  notes: Returns SourceIndex, SystemName, and ByName for the queried source.

# --- Pins service ---
- id: pins_invoke_id
  label: Invoke PIN
  kind: action
  command: 'ACTION Ds/Pins 1 InvokeId "1"'
  params:
    - name: pin_id
      type: integer
      description: PIN number to invoke (not guaranteed stable after reboot if recently altered)
  notes: Requires Davaar 67+ firmware.

- id: pins_read_list
  label: Read PIN List
  kind: query
  command: 'ACTION Ds/Pins 1 ReadList "[ 1]"'
  params:
    - name: id_list
      type: string
      description: JSON-array-style list of PIN IDs to read (source example "[ 1]")

- id: pins_get_id_array
  label: Get PIN ID Array
  kind: query
  command: 'ACTION Ds/Pins 1 GetIdArray'
  params: []
  notes: Returns the live PIN number assignments.

# --- LPEC protocol framing commands (documented in Command Summary) ---
- id: lpec_subscribe
  label: Subscribe To Service
  kind: action
  command: 'SUBSCRIBE [sub-device]/[service]'
  params:
    - name: service_path
      type: string
      description: Sub-device/service path, e.g. "Ds/Product", "MediaRenderer/AVTransport"
  notes: |
    Response: SUBSCRIBE [subscription-id], followed by an initial EVENT with
    sequence-no 0 containing all current evented variable values. Up to 16
    simultaneous service subscriptions per session.

- id: lpec_unsubscribe_by_id
  label: Unsubscribe By Subscription ID
  kind: action
  command: 'UNSUBSCRIBE [subscription-id]'
  params:
    - name: subscription_id
      type: integer
      description: Subscription ID returned by prior SUBSCRIBE

- id: lpec_unsubscribe_by_service
  label: Unsubscribe By Service Path
  kind: action
  command: 'UNSUBSCRIBE [sub-device]/[service]'
  params:
    - name: service_path
      type: string
      description: Sub-device/service path

- id: lpec_unsubscribe_all
  label: Unsubscribe All
  kind: action
  command: 'UNSUBSCRIBE'
  params: []
  notes: Multiple UNSUBSCRIBE responses may be received (one per active subscription).
```

## Feedbacks
```yaml
# RESPONSE - synchronous reply to ACTION messages; carries output arguments.
- id: response_message
  type: string
  description: |
    RESPONSE "[outarg1]" "[outarg2]" ... - quoted, XML-escaped output arguments.
    Empty RESPONSE (no args) indicates a successful void action.

# Documented device/service query responses with concrete values:
- id: volume_state
  type: integer
  description: Preamp / RenderingControl volume level (source examples: "40", "50").

- id: source_state
  type: object
  description: |
    Returned by ACTION Ds/Product 2 Source "<index>"; contains SourceIndex,
    SystemName, and ByName for the queried source.
```

## Variables
```yaml
- id: volume
  type: integer
  description: Master volume level, settable via SetVolume / queryable via GetVolume / Preamp Volume.

- id: mute
  type: boolean
  description: Mute state, settable via Preamp SetMute.

- id: source_index
  type: integer
  description: Active source index (settable via SetSourceIndex). Not guaranteed stable across firmware/Konfig changes.

- id: source_system_name
  type: string
  description: Active source SystemName (settable via SetSourceBySystemName, v2).

# UNRESOLVED: full set of settable parameters not exhaustively enumerated; LPEC exposes
# the full UPnP service surface which varies by device type and is discoverable via UPnP.
```

## Events
```yaml
# Unsolicited messages the device sends over the LPEC session.

- id: event_state_change
  type: object
  description: |
    EVENT [subscription-id] [sequence-no] [var1-name] "[var1]" ...
    Sent on subscription (sequence-no 0, full state) and on any evented-variable
    change (sequence-no increments, wraps to 1, only changed vars reported).
  example: 'EVENT 49 0 ProductName "Sneaky Music DS" ProductRoom "Main Room" ProductStandby "true" ProductSourceIndex "0"'

- id: alive_subdevice
  type: object
  description: |
    ALIVE [sub-device] [udn]
    Sent on connect for each enabled sub-device, and when a sub-device is
    re-enabled at runtime.
  example: 'ALIVE Ds 4c494e4e-0050-c221-71e5-df000003013f'

- id: byebye_subdevice
  type: object
  description: |
    BYEBYE [sub-device] [udn]
    Sent when a sub-device is disabled or before the device closes the
    connection on reboot. Commonly preceded by unsolicited UNSUBSCRIBE messages
    for affected subscriptions.

- id: error_message
  type: object
  description: |
    ERROR [code] "[description]" - sent in response to a malformed/unrecognised
    ACTION/SUBSCRIBE/UNSUBSCRIBE, or asynchronously for service exceptions.
    Defined codes: 101 Command not recognised, 102 Service not specified,
    103 Service not found, 104 Version invalid, 105 Version not specified,
    106 Version not supported, 107 Method not specified, 108 Method execution
    exception, 201 Boolean argument invalid, 202 String argument invalid,
    203 Unsigned numeric argument invalid, 204 Signed numeric invalid,
    205 Binary argument invalid, 206 Invalid argument escaping, 301 Argument
    list incomplete, 302 Argument not quoted, 303 Argument incomplete,
    401 Already subscribed, 402 Client has too many subscriptions, 403 Service
    has too many subscriptions, 404 Subscription not found, 405 Service not
    subscribed, 406 Invalid XML escaping. Service-specific ERROR codes may
    also be sent.

- id: unsolicited_unsubscribe
  type: object
  description: |
    UNSUBSCRIBE [subscription-id] - sent unsolicited when a sub-device is
    disabled (forcibly revoking its subscriptions) or when UNSUBSCRIBE-all is issued.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source. Populate if
# vendor documents combined play/route macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in the LPEC protocol reference.
```

## Notes
- **Connection limit:** up to 4 simultaneous LPEC sessions per device; sessions beyond the 4th are ignored (commands dropped, not rejected).
- **Crestron caveat:** some Crestron processors re-open Telnet ports without closing existing ones. Recommended to close the connection when the touchpanel is asleep.
- **Session cleanup:** closing an LPEC session automatically revokes all outstanding subscriptions. Each product supports only one concurrent LPEC session.
- **Spurious first-command error (known bug):** the first command sent after the initial ALIVE messages generates an error. Workaround — send a blank command immediately after ALIVE messages to absorb the spurious error.
- **Argument escaping:** all input/output arguments are XML-escaped and double-quoted. Messages are `<CR><LF>` terminated.
- **Source-index instability:** `SetSourceIndex` numeric indices are not guaranteed; they shift with firmware changes and (Davaar 50+) when sources are made invisible. Prefer `SetSourceBySystemName` (v2) for stable routing.
- **PIN instability:** PIN numbers from `InvokeId` may change after a reboot if recently altered; PIN invoke requires Davaar 67+.
- **Service/action discovery:** LPEC has no built-in service discovery. The available service set is device-type-dependent; the recommended method is UPnP service discovery (e.g. Intel Device Spy, or fetching `http://<ip>:<port>/Ds/device.xml` and the linked `service.xml`), which maps trivially onto LPEC ACTIONs.
- **Protocol versioning:** service actions carry an explicit version (e.g. `1` vs `2` for `Ds/Product`). v2 by-name source actions require Davaar 50+.

<!-- UNRESOLVED: model-specific compatible_with.models — source is generic LPEC for the DS family (example device "Sneaky Music DS"); exact Spotify-source model identifier not stated. -->
<!-- UNRESOLVED: complete UPnP service/action catalogue not enumerated in source (only representative examples given); full set is device-dependent and discoverable via UPnP. -->
<!-- UNRESOLVED: voltage/current/power specifications — out of scope for protocol doc, not stated. -->
<!-- UNRESOLVED: protocol version number of LPEC itself — not stated in source. -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - https://docs.linn.co.uk/wiki/index.php/Developer:LPEC
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
  - https://docs.linn.co.uk/wiki/index.php/Spotify
retrieved_at: 2026-06-15T12:42:04.183Z
last_checked_at: 2026-06-16T07:08:33.975Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:08:33.975Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions have literal matches in the LPEC protocol source; all transport parameters verified; bidirectional coverage complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific variants (DS vs DSI vs DSM) not enumerated in source; only generic LPEC protocol documented."
- "exact Spotify-source actions not separately listed; source documents generic DS service actions."
- "firmware version compatibility ranges only partly stated (Davaar 50+ for source indexing by name, Davaar 67+ for PIN invoke)."
- "full set of settable parameters not exhaustively enumerated; LPEC exposes"
- "no multi-step sequences explicitly described in source. Populate if"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "model-specific compatible_with.models — source is generic LPEC for the DS family (example device \"Sneaky Music DS\"); exact Spotify-source model identifier not stated."
- "complete UPnP service/action catalogue not enumerated in source (only representative examples given); full set is device-dependent and discoverable via UPnP."
- "voltage/current/power specifications — out of scope for protocol doc, not stated."
- "protocol version number of LPEC itself — not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
