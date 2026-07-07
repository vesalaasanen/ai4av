---
spec_id: admin/boxlight-frontrow-conductor
schema_version: ai4av-public-spec-v1
revision: 1
title: "Boxlight FrontRow Conductor Control Spec"
manufacturer: Boxlight
model_family: "FrontRow Conductor"
aliases: []
compatible_with:
  manufacturers:
    - Boxlight
  models:
    - "FrontRow Conductor"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - boxlight.com
source_urls:
  - https://boxlight.com/files/library/files/Documentation-and-support-pdfs/Audio-Setup-Guides/FrontRow-Conductor-Setup-Guide-1550-00002.pdf
  - https://boxlight.com/files/library/files/Documentation-and-support-pdfs/Audio-Setup-Guides/FrontRow-Conductor-Alert-and-Response-Setup-Guide.pdf
retrieved_at: 2026-06-30T11:39:14.328Z
last_checked_at: 2026-07-07T11:04:07.360Z
generated_at: 2026-07-07T11:04:07.360Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input hint specified RS-232C, but the source documents network (HTTP/UDP) control of the Conductor itself; serial is only referenced as a proxied output to attached devices via #COM1. No direct RS-232 control OF the Conductor is documented."
  - "specific UDP port for Control Command Actions not stated (broadcast to x.x.x.255 noted, port number absent)."
  - "response/acknowledgement formats for commands not documented."
  - "UDP port number not stated in source"
  - "no power, routing, level, or query commands for the Conductor itself are documented."
  - "source documents no response/acknowledgement strings or queryable state values"
  - "no settable scalar parameters documented for the machine-control interface."
  - "no outbound event/notification protocol documented."
  - "no fixed/built-in macro sequences documented verbatim in source."
  - "no safety/interlock procedures stated in source."
  - "Encore receive port, exact #NET/#AUD1 grammar variants, UDP control port, and response formats are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:04:07.360Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched exactly against source control commands; HTTP and UDP endpoints fully documented with literal syntax. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Boxlight FrontRow Conductor Control Spec

## Summary
The FrontRow Conductor is a school-wide paging, intercom, and emergency-alert control system (hosted on a DRS5000 or DRS-VM server, default IP 192.168.1.99). This spec covers its IP-based machine control interface: HTTP REST-style endpoints for trigger scripts, calls, and alerts, plus a FrontRoom command syntax (`#PAS`, `#AUD1`, `#COM1`, `#HTP`, `#NET`) sent as UDP control-command actions. The Conductor can also proxy serial (`#COM1`) strings to attached RS-232 devices such as projectors.

<!-- UNRESOLVED: input hint specified RS-232C, but the source documents network (HTTP/UDP) control of the Conductor itself; serial is only referenced as a proxied output to attached devices via #COM1. No direct RS-232 control OF the Conductor is documented. -->
<!-- UNRESOLVED: specific UDP port for Control Command Actions not stated (broadcast to x.x.x.255 noted, port number absent). -->
<!-- UNRESOLVED: response/acknowledgement formats for commands not documented. -->

## Transport
```yaml
protocols:
  - http
  - udp
  - tcp  # inferred: HTTP/REST transport implies TCP underly; source states IP control
addressing:
  base_url: http://192.168.1.99:80/calypso/conductor  # from trigger/call/alert URL examples in source
  # default server IP 192.168.1.99, subnet 255.255.255.0, port 80 shown in API URL example
  # port: 80  # stated in API URL example only; HTTP default
udp:
  broadcast_address: x.x.x.255  # source: set last octet to 255 to broadcast to all ezRoom devices in range
  port: null  # UNRESOLVED: UDP port number not stated in source
auth:
  type: none  # inferred: API security is optional per source; default control URLs work without auth
  # NOTE: optional API password security documented. When enabled, password is inserted into URL path:
  #   http://192.168.1.99:80/calypso/conductor/:{password}/trigger/{name}  (example password: frontrow)
  # NOTE: separate application/database logins exist (not the machine-control API):
  #   database login cserv_admin / calypso; user login admin / admin4conductor
```

## Traits
```yaml
# No standard AV traits (powerable/routable/queryable/levelable) map cleanly to the
# documented Conductor command set, which centers on paging/intercom/alert actions.
# UNRESOLVED: no power, routing, level, or query commands for the Conductor itself are documented.
```

## Actions
```yaml
# FrontRow command syntax, sent as Control Command Action Command Text over UDP, or via #NET/#HTP from networked devices.
# HTTP endpoints are REST-style GET requests to the Conductor server.

# --- FrontRoom command syntax actions ---

- id: pas_priority_alert_color
  label: Priority Alert ClassLight Color
  kind: action
  command: '#PAS["HPS",M{n}]'
  params:
    - name: n
      type: integer
      description: Priority Alert color version (1-5); set M1..M5
  notes: Displays Priority Alert colors on ClassLight-equipped ezRooms.

- id: pas_alert_off
  label: ClassLight Alert Off
  kind: action
  command: '#PAS["OFF"]'
  params: []
  notes: Turns off the ClassLight alert on any/all ezRooms.

- id: aud_mute
  label: Audio Mute
  kind: action
  command: '#AUD1[M0]'
  params: []
  notes: Mutes audio from a CM900. Other #AUD1 parameter values not documented in source.

- id: com1_serial_send
  label: COM1 Serial Send
  kind: action
  command: '#COM1[T1,"{serial_string}"]'
  params:
    - name: serial_string
      type: string
      description: Serial command string to send to the device attached to the CM900 COM1 port (e.g. projector). Example 'POWR1   \r' - noted in source as example only, varies by manufacturer.
  notes: Proxies a serial (RS-232) string to an attached device via the CM900 COM1 port.

- id: htp_http_command
  label: HTTP Command
  kind: action
  command: '#HTP[{url}]'
  params:
    - name: url
      type: string
      description: Full HTTP URL to request from the Conductor server (e.g. call/alert endpoints).
  notes: Used from FrontRow networked devices to issue HTTP requests.

- id: net_network_command
  label: Network Command
  kind: action
  command: '#NET[{args}]'
  params:
    - name: args
      type: string
      description: FrontRoom network command arguments. Example CB6000 form '#NET[F1, @{CM900}, P7262, ''#COM1[T1,"POWR1   \r"]''];'.
  notes: Routes a command to a networked FrontRow device. Full #NET grammar not exhaustively documented in source.

# --- HTTP REST-style endpoints ---

- id: trigger_script_invoke
  label: Invoke Trigger Script
  kind: action
  command: 'GET http://{server}/calypso/conductor/trigger/{name}'
  params:
    - name: server
      type: string
      description: Conductor server address (default 192.168.1.99)
    - name: name
      type: string
      description: Trigger script name (no spaces allowed)
  notes: URL is loadable into CB6000/CB2000 panels or Encore/Teacher Edition; bookmarkable on smartphones. If API security enabled, insert password as /:{password}/ before /trigger/.

- id: call_request
  label: Send Call Request
  kind: action
  command: 'GET http://{server}/calypso/conductor/call/{device_ip}'
  params:
    - name: server
      type: string
      description: Conductor server address (default 192.168.1.99)
    - name: device_ip
      type: string
      description: IP of audio device initiating the call (omit if sender is the audio device itself, e.g. Juno Connect)
  notes: Sends a call request to Conductor Notifier.

- id: send_alert
  label: Send Alert
  kind: action
  command: 'GET http://{server}/calypso/conductor/alert/{device_ip}/{message}'
  params:
    - name: server
      type: string
      description: Conductor server address (default 192.168.1.99)
    - name: device_ip
      type: string
      description: IP of sending audio device (optional; shown as location in Notifier)
    - name: message
      type: string
      description: Alert text shown in Notifier window (URL-encoded; %20 = space)
  notes: Sends an alert to Conductor Notifier.
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no response/acknowledgement strings or queryable state values
# for the Conductor control interface. Notifier-window display is a UI behavior, not a machine feedback.
```

## Variables
```yaml
# UNRESOLVED: no settable scalar parameters documented for the machine-control interface.
# Command parameters (e.g. PAS color index M1..M5) are enumerated action params, not device variables.
```

## Events
```yaml
# Conductor Notifier RECEIVES call requests and alerts (inbound HTTP to /call/ and /alert/),
# but the source does not document unsolicited notifications EMITTED by the Conductor to controllers.
# UNRESOLVED: no outbound event/notification protocol documented.
```

## Macros
```yaml
# Source describes "Trigger Scripts" as named super-macros combining one or more Actions
# (Control Command, Pause, System Command, Play Audio Sequence, Intercom, P.A., Email).
# These are user-defined at runtime via the Conductor UI, not fixed documented sequences.
# UNRESOLVED: no fixed/built-in macro sequences documented verbatim in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# NOTE: source mentions emergency/alert use cases (LOCKDOWN trigger scripts, relay pulse to
# automated locking systems, Priority Alerts) but documents NO explicit safety interlocks,
# power-on sequencing, or confirmation procedures for the control interface.
# UNRESOLVED: no safety/interlock procedures stated in source.
```

## Notes
- Default server IP is **192.168.1.99**, subnet 255.255.255.0; all Conductor audio-over-IP devices must share the same IP range. Default configuration-computer static IPs: 192.168.1.100 or 192.168.1.98.
- Control Command Actions support sending to a **specified IP address**; broadcast to all ezRooms by setting the last octet to **255**.
- Trigger-script names cannot contain spaces.
- At least one Master device (e.g. CM900) is required for PA/Intercom. PTT mic (CB-65/CB-75) switches must be set to Momentary + PTT; recommended GPI Mode "Rotary + Button", Push-to-Talk Mode "Always (Never Handsfree)".
- Conductor can send text patterns to FrontRow Encore PCs for fullscreen pop-up alerts; firewall must allow inbound to Encore's receive port.
<!-- UNRESOLVED: Encore receive port, exact #NET/#AUD1 grammar variants, UDP control port, and response formats are not stated in the source. -->
````


- Input said RS-232C but source docs HTTP/UDP control; serial only proxied via `#COM1` → flagged unresolved.
- Port 80 only from one URL example; UDP port not stated → null + UNRESOLVED.
- No voltage/power/firmware/protocol-version values invented.
- 9 distinct actions enumerated (6 FrontRoom commands + 3 HTTP endpoints), params shown verbatim from source.

## Provenance

```yaml
source_domains:
  - boxlight.com
source_urls:
  - https://boxlight.com/files/library/files/Documentation-and-support-pdfs/Audio-Setup-Guides/FrontRow-Conductor-Setup-Guide-1550-00002.pdf
  - https://boxlight.com/files/library/files/Documentation-and-support-pdfs/Audio-Setup-Guides/FrontRow-Conductor-Alert-and-Response-Setup-Guide.pdf
retrieved_at: 2026-06-30T11:39:14.328Z
last_checked_at: 2026-07-07T11:04:07.360Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:04:07.360Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched exactly against source control commands; HTTP and UDP endpoints fully documented with literal syntax. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input hint specified RS-232C, but the source documents network (HTTP/UDP) control of the Conductor itself; serial is only referenced as a proxied output to attached devices via #COM1. No direct RS-232 control OF the Conductor is documented."
- "specific UDP port for Control Command Actions not stated (broadcast to x.x.x.255 noted, port number absent)."
- "response/acknowledgement formats for commands not documented."
- "UDP port number not stated in source"
- "no power, routing, level, or query commands for the Conductor itself are documented."
- "source documents no response/acknowledgement strings or queryable state values"
- "no settable scalar parameters documented for the machine-control interface."
- "no outbound event/notification protocol documented."
- "no fixed/built-in macro sequences documented verbatim in source."
- "no safety/interlock procedures stated in source."
- "Encore receive port, exact #NET/#AUD1 grammar variants, UDP control port, and response formats are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
