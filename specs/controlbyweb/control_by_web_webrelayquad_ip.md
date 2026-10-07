---
spec_id: admin/control_by_web-webrelayquad
schema_version: ai4av-public-spec-v1
revision: 3
title: "Control By Web WebRelayQuad Control Spec"
manufacturer: ControlByWeb
model_family: WebRelayQuad
aliases: []
compatible_with:
  manufacturers:
    - ControlByWeb
    - "Control By Web"
  models:
    - WebRelayQuad
    - X-WR-4R1-5
    - X-WR-4R1-I
    - X-WR-4R1-E
    - X-WR-4R3-I
    - X-WR-4R3-E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2024/09/webrelay-quad_um_v2.5.pdf
retrieved_at: 2026-09-26T14:23:16.724Z
last_checked_at: 2026-09-26T14:23:16.724Z
generated_at: 2026-09-26T14:23:16.724Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "setup-page fields are described, but their HTTP write payloads are not documented."
  - "no unsolicited protocol event payloads are documented."
  - "no additional command sequence is required for control."
  - "the catalog alias WebRelayQuad does not identify its hardware generation; this draft explicitly limits applicability to the legacy part numbers listed above."
  - "firmware version range, partial-range Modbus bit placement, allowed unit IDs, HTTP error responses, and whether polling cancels a running pulse."
verification:
  verdict: verified
  checked_at: 2026-09-26T14:23:16.724Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 HTTP/Modbus operations match the complete legacy X-WR-4R1/4R3 manual; model scope, framing, authentication, addresses and float encoding agree. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Control By Web WebRelayQuad Control Spec

## Summary
Control and monitor the four relays of the original WebRelay-Quad through HTTP/XML or Modbus/TCP. This revision covers the X-WR-4R1 models named in the manufacturer manual and the X-WR-4R3-I/E replacements explicitly declared compatible in section 1.2. The catalog alias WebRelayQuad is retained for identity continuity; the newer X-WR-444 generation is outside this revision's compatibility scope.

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 80 # Default HTTP TCP port; configurable in Network Setup.
auth:
  type: none # Default: control password disabled, as stated in section 3.3.
  # When the control password is enabled, HTTP requests require Basic authentication.
  # Authorization: Basic base64(username:password)
  # Section 3.2.3 example is none:webrelay -> bm9uZTp3ZWJyZWxheQ==.
```

HTTP actions below specify the method and request target. Section 3.2.3 illustrates raw requests such as `GET /state.xml?relay1State=1 HTTP/1.1\r\n\r\n`. With the control password enabled, insert the `Authorization: Basic ...` header before the final blank line. Passwords may contain up to 10 characters. HTTP/XML and the browser control page share the control-password setting; setup pages always require a password.

Modbus actions use a separate TCP connection to default port **502**, configurable in Network Setup. Modbus has no password authentication and is disabled whenever the control password is enabled. The server permits multiple requests per connection, with an inactivity timeout of approximately 50 seconds. Do not send binary Modbus commands to the HTTP port.

## Traits
```yaml
- powerable # Inferred from explicit relay on/off operations.
- queryable # Inferred from state.xml and Read Coils.
```

## Actions
```yaml
- id: query_relay_states
  label: "Read all relay states"
  kind: "query"
  command: "GET /state.xml"
  description: "Section 3.2.1, page 29. Returns relay1state through relay4state; each is 0 (off) or 1 (on)."
  params: []
- id: query_relay_states_with_headers
  label: "Read relay states with headers"
  kind: "query"
  command: "GET /stateFull.xml"
  description: "Section 3.2.2, page 30. The manual calls this the XML reply with headers; state.xml has no reply headers."
  params: []
- id: query_control_page
  label: "Read browser control page"
  kind: "query"
  command: "GET /home.html"
  description: "Section 3.2.3, page 31. Documented GET request for the browser control page."
  params: []
- id: query_setup_page
  label: "Read setup page"
  kind: "query"
  command: "GET /setup.html"
  description: "Sections 2.3.3 and 2.4, pages 18-20. Reads the setup interface, including model and firmware information. Always requires the setup password (default webrelay); the manual specifies no username. No setup write payload is documented."
  params: []
- id: query_advanced_setup_page
  label: "Read advanced setup page"
  kind: "query"
  command: "GET /advSetup.html"
  description: "Section 2.4.2, page 24. Reads the advanced setup interface, including MTU configuration. Path is case-sensitive. Always requires the setup password (default webrelay); the manual specifies no username. No setup write payload is documented."
  params: []
- id: set_relay_1
  label: "Set relay 1 state"
  kind: "action"
  command: "GET /state.xml?relay1State={state}"
  description: "Section 3.2.2, pages 29-30. The relay1State variable is explicitly named. Returns the XML state. A repeated pulse resets the pulse timer."
  params:
    - name: state
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the duration configured on the relay setup page."
- id: pulse_relay_1_with_duration
  label: "Pulse relay 1 with explicit duration"
  kind: "action"
  command: "GET /state.xml?relay1State=2&pulseTime1={seconds}"
  description: "Section 3.2.2, pages 29-30. pulseTimeX applies to the corresponding relay X. The source examples put pulseTime after relayXState. No ordering constraint is stated. See Notes for the pulse-duration limits documented elsewhere in the manual."
  params:
    - name: seconds
      type: number
      description: "Pulse duration in seconds. This request overrides the configured duration for this pulse only."
- id: set_relay_2
  label: "Set relay 2 state"
  kind: "action"
  command: "GET /state.xml?relay2State={state}"
  description: "Section 3.2.2, pages 29-30. The relay2State variable is explicitly named. Returns the XML state. A repeated pulse resets the pulse timer."
  params:
    - name: state
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the duration configured on the relay setup page."
- id: pulse_relay_2_with_duration
  label: "Pulse relay 2 with explicit duration"
  kind: "action"
  command: "GET /state.xml?relay2State=2&pulseTime2={seconds}"
  description: "Section 3.2.2, pages 29-30. pulseTimeX applies to the corresponding relay X. The source examples put pulseTime after relayXState. No ordering constraint is stated. See Notes for the pulse-duration limits documented elsewhere in the manual."
  params:
    - name: seconds
      type: number
      description: "Pulse duration in seconds. This request overrides the configured duration for this pulse only."
- id: set_relay_3
  label: "Set relay 3 state"
  kind: "action"
  command: "GET /state.xml?relay3State={state}"
  description: "Section 3.2.2, pages 29-30. The relay3State variable is explicitly named. Returns the XML state. A repeated pulse resets the pulse timer."
  params:
    - name: state
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the duration configured on the relay setup page."
- id: pulse_relay_3_with_duration
  label: "Pulse relay 3 with explicit duration"
  kind: "action"
  command: "GET /state.xml?relay3State=2&pulseTime3={seconds}"
  description: "Section 3.2.2, pages 29-30. pulseTimeX applies to the corresponding relay X. The source examples put pulseTime after relayXState. No ordering constraint is stated. See Notes for the pulse-duration limits documented elsewhere in the manual."
  params:
    - name: seconds
      type: number
      description: "Pulse duration in seconds. This request overrides the configured duration for this pulse only."
- id: set_relay_4
  label: "Set relay 4 state"
  kind: "action"
  command: "GET /state.xml?relay4State={state}"
  description: "Section 3.2.2, pages 29-30. The relay4State variable is explicitly named. Returns the XML state. A repeated pulse resets the pulse timer."
  params:
    - name: state
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the duration configured on the relay setup page."
- id: pulse_relay_4_with_duration
  label: "Pulse relay 4 with explicit duration"
  kind: "action"
  command: "GET /state.xml?relay4State=2&pulseTime4={seconds}"
  description: "Section 3.2.2, pages 29-30. pulseTimeX applies to the corresponding relay X. The source examples put pulseTime after relayXState. No ordering constraint is stated. See Notes for the pulse-duration limits documented elsewhere in the manual."
  params:
    - name: seconds
      type: number
      description: "Pulse duration in seconds. This request overrides the configured duration for this pulse only."
- id: set_multiple_relays
  label: "Set multiple relay states"
  kind: "action"
  command: "GET /state.xml?relay1State={state1}&relay2State={state2}&relay3State={state3}&relay4State={state4}"
  description: "Section 3.2.2, page 30. All four variables or any subset may be included, in any order. Omitted relays are unchanged. Returns the XML state."
  params:
    - name: state1
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the configured duration."
    - name: state2
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the configured duration."
    - name: state3
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the configured duration."
    - name: state4
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the configured duration."
- id: set_relay_without_reply
  label: "Set relay state without XML reply"
  kind: "action"
  command: "GET /state.xml?relay{relay}State={state}&noReply=1"
  description: "Section 3.2.2, page 30. Appending noReply=1 suppresses the XML response; the source illustrates on and off commands. This modifier may also be appended to a multi-relay request."
  params:
    - name: relay
      type: integer
      description: "Relay number 1 through 4."
    - name: state
      type: integer
      description: "0 = off; 1 = on; 2 = pulse for the configured duration."
- id: modbus_read_coils
  label: "Modbus read relay coils"
  kind: "query"
  command: "00 01 00 00 00 06 FF 01 {start_hi} {start_lo} {quantity_hi} {quantity_lo}"
  description: "Section 3.3.1, pages 32-33. Hexadecimal Modbus/TCP request template; split each 16-bit parameter into its high and low bytes. Header uses source example transaction ID 0x0001 and unit ID 0xFF. Exact source example: 00 01 00 00 00 06 FF 01 00 00 00 02. Reads a contiguous range; read all four to obtain both relays 1 and 4."
  params:
    - name: start
      type: integer
      description: "Two-byte address, 0x0000 through 0x0003: relays 1 through 4."
    - name: quantity
      type: integer
      description: "Two-byte quantity, 1 through 4; start + quantity must be at most 4."
- id: modbus_write_single_coil
  label: "Modbus set one relay"
  kind: "action"
  command: "00 01 00 00 00 06 FF 05 {address_hi} {address_lo} {value} 00"
  description: "Section 3.3.2, page 34. Hexadecimal Modbus/TCP template with the source example transaction ID and unit ID. Exact source example: 00 01 00 00 00 06 FF 05 00 00 FF 00."
  params:
    - name: address
      type: integer
      description: "Two-byte address, 0x0000 through 0x0003: relays 1 through 4."
    - name: value
      type: integer
      description: "One byte: 0xFF turns the relay on; 0x00 turns it off. Followed by a literal padding byte 0x00."
- id: modbus_write_multiple_coils
  label: "Modbus set multiple relays"
  kind: "action"
  command: "00 01 00 00 00 08 FF 0F {start_hi} {start_lo} {quantity_hi} {quantity_lo} 01 {outputs}"
  description: "Section 3.3.3, pages 35-36. Hexadecimal Modbus/TCP template follows the request field table. Source example: 00 01 00 00 00 08 FF 0F 00 00 00 01 01 0F. This example requests only one coil despite a four-bit value; use the documented quantity=4 for all four relays. Partial-range output-bit mapping is unresolved; see Notes."
  params:
    - name: start
      type: integer
      description: "Two-byte starting address, 0x0000 through 0x0003."
    - name: quantity
      type: integer
      description: "Two-byte output count, 1 through 4; the contiguous range must stay within the four relays."
    - name: outputs
      type: integer
      description: "One output byte. For start=0 and quantity=4, bits 0, 1, 2, 3 control relays 1, 2, 3, 4 respectively; 0 = off and 1 = on."
- id: modbus_pulse_relays
  label: "Modbus pulse one or more relays"
  kind: "action"
  command: "00 01 00 00 {length_hi} {length_lo} FF 10 {start_hi} {start_lo} {registers_hi} {registers_lo} {byte_count} {pulse_data}"
  description: "Section 3.3.4, pages 36-37. Hexadecimal Modbus/TCP template with source example transaction ID and unit ID. Exact source example: 00 01 00 00 00 0B FF 10 00 10 00 02 04 00 00 41 20. Starts the selected relay(s) immediately, then turns them off after the duration. Values below 0.1 seconds clamp to 0.1; values above 86400 seconds clamp to 86400. Subsequent commands can cancel the timer; see Notes."
  params:
    - name: start
      type: integer
      description: "Two-byte starting register: 0x0010 = relay 1; 0x0012 = relay 2; 0x0014 = relay 3; 0x0016 = relay 4."
    - name: registers
      type: integer
      description: "Two registers per relay to pulse; cover only the relay register pairs documented above."
    - name: byte_count
      type: integer
      description: "Two times the number of registers; four bytes per relay."
    - name: pulse_data
      type: string
      description: "One IEEE 754 32-bit duration in seconds per relay. Each 16-bit word is big-endian; send the least significant word first (ABCD -> CDAB). 10 seconds is 00 00 41 20 on the wire."
    - name: length
      type: integer
      description: "Modbus/TCP length: 7 + byte_count, derived from the documented request fields; 0x000B for one relay."
```

## Feedbacks
```yaml
- id: relay_state
  type: enum
  values: ["0", "1"]
  description: "HTTP XML tags relay1state, relay2state, relay3state, relay4state: 0 means coil off; 1 means coil energized. Response tag spelling differs from the relayXState request variables."
- id: modbus_coil_status
  type: integer
  description: "FC 0x01 response has byte count 0x01 and a coil status byte. For all four coils starting at address 0, bits 0 through 3 report relays 1 through 4, with 0 off and 1 on."
- id: modbus_write_single_ack
  type: string
  description: "FC 0x05 response reports the reference address, value byte, and zero padding."
- id: modbus_write_multiple_ack
  type: string
  description: "FC 0x0F response reports the starting address and quantity of outputs."
- id: modbus_pulse_ack
  type: string
  description: "FC 0x10 response reports the reference register and word count."
- id: modbus_exception
  type: string
  description: "Exception function codes: 0x81, 0x85, 0x8F, 0x90 for FC 1, 5, 15, 16 respectively. Exception 0x01 means unsupported function; 0x02 means incorrect starting-address/quantity combination."
```

## Variables
```yaml
# UNRESOLVED: setup-page fields are described, but their HTTP write payloads are not documented.
```

## Events
```yaml
# UNRESOLVED: no unsolicited protocol event payloads are documented.
```

## Macros
```yaml
# UNRESOLVED: no additional command sequence is required for control.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

The manufacturer requires qualified installation, shutting off power before wiring, and prohibits medical or life-saving applications or uses where failure could cause serious injury or loss of life. No protocol confirmation or interlock procedure is specified.

## Notes
- Source: [WebRelay-Quad Users Manual, Revision 2.5, May 2015](https://controlbyweb.com/wp-content/uploads/2024/09/webrelay-quad_um_v2.5.pdf), especially sections 1.2, 2.4.2-2.4.4, and 3.2-3.3.4. Manufacturer product page: [Original WebRelay-Quad](https://controlbyweb.com/original-webrelay-quad/).
- Source applicability: the cover names X-WR-4R1-5, X-WR-4R1-I, and X-WR-4R1-E. Section 1.2 says X-WR-4R3-I/E replace X-WR-4R1-I/E, use the same firmware, and are fully compatible. The [current WebRelay-Quad](https://controlbyweb.com/webrelay-quad/) instead names X-WR-444 variants; those require their own 400-series documentation and are not covered here.
- This manual documents four relay outputs. Its occasional generic references to an input do not establish any digital-input channel or input command. Counters, on-time counters, registers other than the Modbus pulse registers, JSON, SNMP, MQTT, and cloud commands are not claimed by this revision.
- Preserve the request-variable spelling shown in the source: relay1State through relay4State and pulseTime1 through pulseTime4. XML feedback uses lowercase relay1state through relay4state.
- A per-request pulseTimeX does not update the stored preset. The configured pulse range in section 2.4.4 is 0.1-86400 seconds, factory default 1.5 seconds. Section 3.3.4 explicitly documents the same range and clamping for Modbus; section 3.2.2 does not separately specify HTTP override range validation or clamping.
- Repeated pulse commands reset the pulse timer. Sections 2.4.4 and 3.3.4 state that other commands may cancel a running pulse and execute immediately. The source does not clearly resolve whether state-only queries count as timer-canceling commands; verify this behavior before relying on polling during a pulse.
- Modbus request fields above follow the manual's field tables. Numeric placeholders encode bytes, not ASCII hex text. For FC 0x10, the length formula is arithmetic derived from the documented header and data-field sizes; the published one-relay example confirms length 0x000B.
- Source inconsistencies are preserved as cautions, not implemented as facts: the FC 0x0F sample asks for one coil while carrying value 0x0F; several write-response arrays use transaction ID 0x0005 while the associated request uses 0x0001; the FC 0x0F response example has quantity zero. The FC 0x10 prose calls its float a 32-byte number, but the field table, four data bytes, and worked conversion describe a 32-bit float.
- The four-relay Modbus bit map is explicit. Partial-range FC 0x01/0x0F bit placement is not separately illustrated in the manual; this draft does not infer it from another device. The permitted unit-ID range and HTTP error/status responses are also not specified.
- No physical-device testing was performed for this draft.
<!-- UNRESOLVED: the catalog alias WebRelayQuad does not identify its hardware generation; this draft explicitly limits applicability to the legacy part numbers listed above. -->
<!-- UNRESOLVED: firmware version range, partial-range Modbus bit placement, allowed unit IDs, HTTP error responses, and whether polling cancels a running pulse. -->

## Provenance

```yaml
source_domains:
  - controlbyweb.com
source_urls:
  - https://controlbyweb.com/wp-content/uploads/2024/09/webrelay-quad_um_v2.5.pdf
retrieved_at: 2026-09-26T14:23:16.724Z
last_checked_at: 2026-09-26T14:23:16.724Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-26T14:23:16.724Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 HTTP/Modbus operations match the complete legacy X-WR-4R1/4R3 manual; model scope, framing, authentication, addresses and float encoding agree. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "setup-page fields are described, but their HTTP write payloads are not documented."
- "no unsolicited protocol event payloads are documented."
- "no additional command sequence is required for control."
- "the catalog alias WebRelayQuad does not identify its hardware generation; this draft explicitly limits applicability to the legacy part numbers listed above."
- "firmware version range, partial-range Modbus bit placement, allowed unit IDs, HTTP error responses, and whether polling cancels a running pulse."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
