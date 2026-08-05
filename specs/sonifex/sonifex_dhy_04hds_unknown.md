---
spec_id: admin/sonifex-dhy-04hds
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sonifex DHY-04HDS Control Spec"
manufacturer: Sonifex
model_family: DHY-04HDS
aliases: []
compatible_with:
  manufacturers:
    - Sonifex
  models:
    - DHY-04HDS
    - DHY-04G
    - DHY-04GS
    - DHY-04GT
    - DHY-04HD
    - DHY-04HDT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sonifex.co.uk
source_urls:
  - https://sonifex.co.uk/download/418/current-product-handbooks/4450/sonifex-dhy-04g-dhy-04hd-handbook-v1-07.pdf
  - https://sonifex.co.uk/technical/software/
retrieved_at: 2026-07-01T14:26:58.802Z
last_checked_at: 2026-08-05T08:43:54.043Z
generated_at: 2026-08-05T08:43:54.043Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "webserver machine protocol (HTTP API) not documented; only browser UI described"
  - "no input/output routing commands in source"
  - "no level/volume commands in source"
  - "no explicit power on/off command in source"
  - "settable parameters reachable over the documented RS-232 interface are not"
  - "exact framing/discriminator not specified in source beyond 'DTD:x where x is the DTMF signal detected'.\""
  - "no multi-step command sequences described in source."
  - "source contains no explicit safety warnings, interlocks, or power-on"
  - "HTTP/REST API surface not documented in source. UNRESOLVED: response framing (newline, CR, terminator) not specified in source. UNRESOLVED: BIDIR flow control direction details (RTS/CTS pins exposed but not handshake protocol behaviour) not stated in source for the RS-232 port."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:43:54.043Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions map to literal mnemonics in the source command table; transport params (19200/e/8/1/XON-XOFF) match the source verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Sonifex DHY-04HDS Control Spec

## Summary
Sonifex DHY-04HDS is a telephone hybrid unit (DHY-04G/HD family) providing audio interfacing between a POTS/GSM line and a mixing console. This spec covers the RS-232 serial control interface documented in the vendor handbook (Revision 1.07, May 2018), including call-handling commands, DTMF send, status requests and unit-information queries. The device also has an embedded webserver for configuration; only the browser-facing HTTP transport is described here, no machine-protocol commands.

<!-- UNRESOLVED: webserver machine protocol (HTTP API) not documented; only browser UI described -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: even  # source states "e"
  stop_bits: 1
  flow_control: xon_xoff
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred (Tier 2): VER:, UID:, SER:, MAC:, NET:, SRQ:, BSV: query commands returning values present in source
# - routable        # UNRESOLVED: no input/output routing commands in source
# - levelable       # UNRESOLVED: no level/volume commands in source
# - powerable       # UNRESOLVED: no explicit power on/off command in source
```

## Actions
```yaml
# All commands below carried verbatim from the Serial Interface Commands & Responses table.
# Commands end with no explicit terminator described in source; emitted as bare mnemonics
# with trailing colon as documented.

- id: answer_call
  label: Answer Call
  kind: action
  command: "ANS:"
  params: []
  notes: "Responds ACK: on success, NAK: on failure. Source: Serial Interface Commands table."

- id: bootstrap_version
  label: Bootstrap Version
  kind: query
  command: "BSV:"
  params: []
  notes: "Response: BOOT:x.xx.xxx.xxx"

- id: clear_call
  label: Clear Call
  kind: action
  command: "CLR:"
  params: []
  notes: "Responds ACK: or NAK:"

- id: send_dtmf_string
  label: Send DTMF String
  kind: action
  command: "DTS:{digits}"
  params:
    - name: digits
      type: string
      description: DTMF digit string, e.g. "abcd"
  notes: "Source: DTS:nnnn where nnnn is the digit string. Responds ACK: or ERR:"

- id: dtmf_tone_detect
  label: DTMF Tone Detect (serial reflection)
  kind: feedback
  command: "DTD:{digit}"
  params:
    - name: digit
      type: string
      description: Detected DTMF digit reflected by serial port
  notes: "UNRESOLVED literal: source describes DTD:x output behavior (serial reflects detected DTMF), exact framing not specified. Source: Remote Input Port section."

- id: mac_request
  label: MAC Address Request
  kind: query
  command: "MAC:"
  params: []
  notes: "Returns current MAC address (format not specified in source)"

- id: network_request
  label: Network Parameters Request
  kind: query
  command: "NET:"
  params: []
  notes: "Returns active Network Parameters (format not specified in source)"

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "SER:"
  params: []
  notes: "Response: SER:nnnnnnn"

- id: make_call
  label: Make Call
  kind: action
  command: "TEL:{number}"
  params:
    - name: number
      type: string
      description: "Telephone number string, OR '#n' where n is 1-7 for speed dial, OR '#L' for redial last number"
  notes: "Responds ACK: or NAK:. Source: TEL:nnnnn"

- id: unit_id_request
  label: Unit ID Request
  kind: query
  command: "UID:"
  params: []
  notes: "Response: UID:DHY-04G/HD"

- id: version_request
  label: Firmware Version Request
  kind: query
  command: "VER:"
  params: []
  notes: "Response: VER:x.xx.xxx.xxx"

- id: status_request
  label: Status Request
  kind: query
  command: "SRQ:"
  params: []
  notes: "Returns STA:NN status code; see Feedbacks section for codes."
```

## Feedbacks
```yaml
# Status codes returned via SRQ: command - source: Status codes table.
- id: sta_initialisation
  type: enum
  values: ["STA:01"]
  description: Initialisation

- id: sta_on_hook
  type: enum
  values: ["STA:02"]
  description: On Hook

- id: sta_ringing
  type: enum
  values: ["STA:03"]
  description: Ringing

- id: sta_off_hook
  type: enum
  values: ["STA:04"]
  description: Off Hook - connected to line

- id: sta_dialling
  type: enum
  values: ["STA:05"]
  description: Dialling

- id: sta_firmware_update
  type: enum
  values: ["STA:06"]
  description: Firmware Update in progress

# Standardised ACK / NAK / ERR responses to action commands.
- id: ack
  type: enum
  values: ["ACK:"]
  description: Command acknowledged

- id: nak
  type: enum
  values: ["NAK:"]
  description: Command rejected / failed

# Error responses to commands.
- id: err_command_not_found
  type: enum
  values: ["ERR:01"]
  description: Command Not Found

- id: err_invalid_command
  type: enum
  values: ["ERR:02"]
  description: Invalid Command (Error Unknown)

- id: err_invalid_parameters
  type: enum
  values: ["ERR:03"]
  description: Invalid Command (Invalid Parameters)

- id: err_parameter_out_of_range
  type: enum
  values: ["ERR:04"]
  description: Parameter out of range

- id: err_write_read_only
  type: enum
  values: ["ERR:05"]
  description: Write Parameter is Read Only

- id: err_call_active
  type: enum
  values: ["ERR:09"]
  description: Command not allowed when Call is Active

- id: err_call_inactive
  type: enum
  values: ["ERR:11"]
  description: Command not allowed when Call is Inactive
```

## Variables
```yaml
# UNRESOLVED: settable parameters reachable over the documented RS-232 interface are not
# enumerated in the source. The source states that "setup and firmware functions have been
# removed and are implemented by an embedded webserver"; no RS-232 setter commands documented.
```

## Events
```yaml
# Source describes DTD:x as DTMF-reflected output from the serial port when configured.
- id: dtmf_detected
  description: "Serial port emits DTD:{digit} reflecting detected DTMF tone when serial reflects DTMF is enabled in webserver Remote Input Port settings. UNRESOLVED: exact framing/discriminator not specified in source beyond 'DTD:x where x is the DTMF signal detected'."
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on
# sequencing requirements beyond the DIPSwitch 6 / Line Hold bootstrap procedure.
```

## Notes
- DHY-04G/HD family covers DHY-04G, DHY-04GS, DHY-04GT, DHY-04HD, DHY-04HDS, DHY-04HDT — all share the documented serial command set.
- Serial default: 19200, e, 8, 1 with XON/XOFF handshaking. Source states "serial port has reduced capability compared to the DHY-03 as the setup and firmware functions have been removed and are implemented by an embedded webserver."
- RS-232 connector is a rear-panel 9-way male D-type; use a straight (pin-to-pin) cable to a PC. Pinout per source: Pin1=N/C, Pin2=TxD, Pin3=RxD, Pin4=N/C, Pin5=Ground, Pin6=N/C, Pin7=CTS, Pin8=RTS, Pin9=N/C.
- Companion SCI software (free, www.sonifex.co.uk/sci) wraps the serial connection for call-handling control; it is a host tool, not a device protocol extension.
- Response framing not stated in source; commands documented without explicit terminator.
- Device exposes an Ethernet/web interface at http://\<ip\>/ (default IP 192.168.0.100 when DIPSwitch 6 is active during power-on; DHCP/AutoIP otherwise). The webserver provides configuration pages but no documented machine-readable HTTP control endpoint.
- Network discovery uses Zeroconf: DHCP, AutoIP (169.254.x.x range), and MDNS-SD via Bonjour. Default static config per source: IP 192.168.0.100, subnet 255.255.255.0, gateway 192.168.0.1. Default Bonjour hostname: `DHY-04G/HD-{serial-without-leading-zeroes}.local.`

<!-- UNRESOLVED: HTTP/REST API surface not documented in source. UNRESOLVED: response framing (newline, CR, terminator) not specified in source. UNRESOLVED: BIDIR flow control direction details (RTS/CTS pins exposed but not handshake protocol behaviour) not stated in source for the RS-232 port. -->

## Provenance

```yaml
source_domains:
  - sonifex.co.uk
source_urls:
  - https://sonifex.co.uk/download/418/current-product-handbooks/4450/sonifex-dhy-04g-dhy-04hd-handbook-v1-07.pdf
  - https://sonifex.co.uk/technical/software/
retrieved_at: 2026-07-01T14:26:58.802Z
last_checked_at: 2026-08-05T08:43:54.043Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:43:54.043Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions map to literal mnemonics in the source command table; transport params (19200/e/8/1/XON-XOFF) match the source verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "webserver machine protocol (HTTP API) not documented; only browser UI described"
- "no input/output routing commands in source"
- "no level/volume commands in source"
- "no explicit power on/off command in source"
- "settable parameters reachable over the documented RS-232 interface are not"
- "exact framing/discriminator not specified in source beyond 'DTD:x where x is the DTMF signal detected'.\""
- "no multi-step command sequences described in source."
- "source contains no explicit safety warnings, interlocks, or power-on"
- "HTTP/REST API surface not documented in source. UNRESOLVED: response framing (newline, CR, terminator) not specified in source. UNRESOLVED: BIDIR flow control direction details (RTS/CTS pins exposed but not handshake protocol behaviour) not stated in source for the RS-232 port."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
